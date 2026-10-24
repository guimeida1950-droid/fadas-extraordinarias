
import { useCallback, useEffect, useState, type FormEvent } from "react";
import "./Suporte.css";

const API = "http://localhost:8080/api";

type Mensagem = {
  id: number;
  autor: string;
  mensagem: string;
  criadoEm: string | null;
};

type Chamado = {
  id: number;
  protocolo: string;
  nome: string;
  email: string;
  categoria: string;
  assunto: string;
  status: string;
  criadoEm: string | null;
  mensagens: Mensagem[];
};

const STATUS_INFO: Record<string, { texto: string; classe: string }> = {
  ABERTO: { texto: "Aberto", classe: "status-aberto" },
  EM_ANDAMENTO: {
    texto: "Em andamento",
    classe: "status-andamento",
  },
  RESOLVIDO: { texto: "Resolvido", classe: "status-resolvido" },
};

const CATEGORIAS: Record<string, string> = {
  DUVIDA: "Dúvida",
  SUGESTAO: "Sugestão",
  RECLAMACAO: "Reclamação",
  OUTRO: "Outro",
};

function formatarData(data: string | null) {
  if (!data) return "Data indisponível";

  const dataObj = new Date(data);

  if (Number.isNaN(dataObj.getTime())) return "Data indisponível";

  return dataObj.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function AdminSuporte() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [autorizacao, setAutorizacao] = useState("");

  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [selecionado, setSelecionado] = useState<Chamado | null>(null);

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [categoria, setCategoria] = useState("");
  const [resposta, setResposta] = useState("");

  const [aviso, setAviso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const requisicao = useCallback(
    async (caminho: string, opcoes: RequestInit = {}) => {
      const res = await fetch(`${API}${caminho}`, {
        ...opcoes,
        headers: {
          Authorization: autorizacao,
          "Content-Type": "application/json",
          ...opcoes.headers,
        },
      });

      if (res.status === 401 || res.status === 403) {
        throw new Error(
          "Acesso negado. Confira suas credenciais administrativas."
        );
      }

      if (!res.ok) {
        let mensagem = `Falha na API (${res.status}).`;

        try {
          const erro = await res.json();
          if (erro.message) mensagem = erro.message;
        } catch {
          // Mantém a mensagem padrão se a resposta não for JSON.
        }

        throw new Error(mensagem);
      }

      if (res.status === 204) return null;

      return res.json();
    },
    [autorizacao]
  );

  const carregarChamados = useCallback(async () => {
    if (!autorizacao) return;

    setCarregando(true);
    setAviso("");

    try {
      const params = new URLSearchParams();

      if (status) params.set("status", status);
      if (categoria) params.set("categoria", categoria);
      if (busca.trim()) params.set("busca", busca.trim());

      const query = params.toString();

      const dados = await requisicao(
        `/admin/suporte/chamados${query ? `?${query}` : ""}`
      );

      setChamados(dados);

      setSelecionado((atual) => {
        if (!atual) return null;
        return dados.find((c: Chamado) => c.id === atual.id) ?? null;
      });
    } catch (e) {
      setAviso(
        e instanceof Error ? e.message : "Erro ao carregar os chamados."
      );
    } finally {
      setCarregando(false);
    }
  }, [autorizacao, status, categoria, busca, requisicao]);

  useEffect(() => {
    if (autorizacao) void carregarChamados();
  }, [autorizacao, carregarChamados]);

  async function entrar(e: FormEvent) {
    e.preventDefault();
    setAviso("");

    const credenciais = `Basic ${btoa(`${usuario}:${senha}`)}`;

    try {
      const res = await fetch(`${API}/admin/suporte/chamados`, {
        headers: {
          Authorization: credenciais,
        },
      });

      if (res.status === 401 || res.status === 403) {
        setAviso("Usuário ou senha incorretos.");
        return;
      }

      if (!res.ok) {
        setAviso(`Não foi possível entrar (${res.status}).`);
        return;
      }

      const dados = await res.json();

      setAutorizacao(credenciais);
      setChamados(dados);
      setSelecionado(null);
      setSenha("");
      setAviso("");
    } catch {
      setAviso(
        "Não foi possível conectar ao servidor. Verifique se o backend está ligado."
      );
    }
  }

  async function abrir(chamado: Chamado) {
    setAviso("");

    try {
      const dados = await requisicao(
        `/admin/suporte/chamados/${chamado.id}`
      );

      setSelecionado(dados);
    } catch (e) {
      setAviso(
        e instanceof Error ? e.message : "Erro ao abrir o atendimento."
      );
    }
  }

  async function enviarResposta(e: FormEvent) {
    e.preventDefault();

    if (!selecionado || !resposta.trim() || enviando) return;

    setEnviando(true);
    setAviso("");

    try {
      const dados = await requisicao(
        `/admin/suporte/chamados/${selecionado.id}/mensagens`,
        {
          method: "POST",
          body: JSON.stringify({ mensagem: resposta.trim() }),
        }
      );

      setSelecionado(dados);
      setResposta("");
      setAviso("Resposta enviada com sucesso.");

      await carregarChamados();
    } catch (e) {
      setAviso(
        e instanceof Error ? e.message : "Erro ao enviar a resposta."
      );
    } finally {
      setEnviando(false);
    }
  }

  async function atualizarStatus(novoStatus: string) {
    if (!selecionado || novoStatus === selecionado.status) return;

    setAviso("");

    try {
      const dados = await requisicao(
        `/admin/suporte/chamados/${selecionado.id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: novoStatus }),
        }
      );

      setSelecionado(dados);
      setAviso("Status atualizado com sucesso.");

      await carregarChamados();
    } catch (e) {
      setAviso(
        e instanceof Error ? e.message : "Erro ao atualizar o status."
      );
    }
  }

  function sair() {
    setAutorizacao("");
    setSenha("");
    setUsuario("");
    setChamados([]);
    setSelecionado(null);
    setResposta("");
    setBusca("");
    setStatus("");
    setCategoria("");
    setAviso("");
  }

  const totalAberto = chamados.filter(
    (c) => c.status === "ABERTO"
  ).length;

  const totalAndamento = chamados.filter(
    (c) => c.status === "EM_ANDAMENTO"
  ).length;

  const totalResolvido = chamados.filter(
    (c) => c.status === "RESOLVIDO"
  ).length;

  if (!autorizacao) {
    return (
      <main className="support-page admin-page">
        <section className="support-card admin-login">
          <div className="admin-login-icon">
            <span aria-hidden="true">✦</span>
          </div>

          <span className="eyebrow">Área restrita</span>
          <h1>Painel da organização</h1>

          <p>
            Entre com suas credenciais administrativas para gerenciar os
            atendimentos.
          </p>

          <form className="support-form" onSubmit={entrar}>
            <label>
              Usuário
              <input
                autoComplete="username"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Seu usuário administrativo"
              />
            </label>

            <label>
              Senha
              <input
                autoComplete="current-password"
                required
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
              />
            </label>

            <button className="button" type="submit">
              Entrar no painel
            </button>
          </form>

          {aviso && (
            <p className="support-notice" role="alert">
              {aviso}
            </p>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="support-page admin-page">
      <section className="support-hero admin-hero">
        <span className="eyebrow">ÁREA ADMINISTRATIVA</span>

        <h1>
          Central de <span>Suporte</span>
        </h1>

        <p>
          Organize as solicitações, acompanhe as conversas e ajude cada
          participante.
        </p>

        <button
          className="button button-outline"
          type="button"
          onClick={sair}
        >
          Sair do painel
        </button>
      </section>

      <section className="admin-stats">
        <article className="admin-stat">
          <span>Total exibido</span>
          <strong>{chamados.length}</strong>
          <small>Chamados na pesquisa atual</small>
        </article>

        <article className="admin-stat">
          <span>Abertos</span>
          <strong>{totalAberto}</strong>
          <small>Aguardando atendimento</small>
        </article>

        <article className="admin-stat">
          <span>Em andamento</span>
          <strong>{totalAndamento}</strong>
          <small>Em atendimento</small>
        </article>

        <article className="admin-stat">
          <span>Resolvidos</span>
          <strong>{totalResolvido}</strong>
          <small>Atendimentos concluídos</small>
        </article>
      </section>

      <section className="support-grid admin-layout">
        <div className="support-card admin-list-panel">
          <div className="admin-section-heading">
            <div>
              <span className="eyebrow">GERENCIAMENTO</span>
              <h2>Atendimentos</h2>
              <p>Selecione um chamado para consultar a conversa.</p>
            </div>

            <button
              type="button"
              className="admin-refresh"
              onClick={() => void carregarChamados()}
              disabled={carregando}
              title="Atualizar lista"
              aria-label="Atualizar lista"
            >
              ↻
            </button>
          </div>

          <form
            className="support-form admin-filters"
            onSubmit={(e) => {
              e.preventDefault();
              void carregarChamados();
            }}
          >
            <label>
              Pesquisar chamados
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Nome, e-mail, protocolo ou assunto"
              />
            </label>

            <div className="admin-filter-row">
              <label>
                Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Todos os status</option>
                  <option value="ABERTO">Aberto</option>
                  <option value="EM_ANDAMENTO">Em andamento</option>
                  <option value="RESOLVIDO">Resolvido</option>
                </select>
              </label>

              <label>
                Categoria
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  <option value="DUVIDA">Dúvida</option>
                  <option value="SUGESTAO">Sugestão</option>
                  <option value="RECLAMACAO">Reclamação</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </label>
            </div>

            <button className="button" type="submit" disabled={carregando}>
              {carregando ? "Buscando..." : "Aplicar filtros"}
            </button>
          </form>

          <div className="admin-ticket-list">
            {chamados.map((c) => {
              const selecionadoAtual = selecionado?.id === c.id;

              const statusAtual = STATUS_INFO[c.status] ?? {
                texto: c.status,
                classe: "",
              };

              return (
                <button
                  type="button"
                  className={`admin-ticket-card ${
                    selecionadoAtual ? "admin-ticket-selected" : ""
                  }`}
                  key={c.id}
                  onClick={() => void abrir(c)}
                  aria-pressed={selecionadoAtual}
                >
                  <div className="admin-ticket-top">
                    <span
                      className="admin-ticket-icon"
                      aria-hidden="true"
                    >
                      {c.categoria === "RECLAMACAO"
                        ? "!"
                        : c.categoria === "DUVIDA"
                          ? "?"
                          : c.categoria === "SUGESTAO"
                            ? "✦"
                            : "•"}
                    </span>

                    <span
                      className={`admin-status ${statusAtual.classe}`}
                    >
                      <span className="admin-status-dot" />
                      {statusAtual.texto}
                    </span>
                  </div>

                  <div className="admin-ticket-content">
                    <h3>{c.assunto}</h3>
                    <p className="admin-ticket-protocol">{c.protocolo}</p>
                    <p className="admin-ticket-name">{c.nome}</p>
                  </div>

                  <div className="admin-ticket-bottom">
                    <span className="admin-ticket-category">
                      {CATEGORIAS[c.categoria] ?? c.categoria}
                    </span>

                    <span className="admin-ticket-open">
                      Ver atendimento <span aria-hidden="true">↗</span>
                    </span>
                  </div>

                  {c.criadoEm && (
                    <p className="admin-ticket-date">
                      Criado em {formatarData(c.criadoEm)}
                    </p>
                  )}
                </button>
              );
            })}

            {!carregando && chamados.length === 0 && (
              <div className="admin-empty-state">
                <span aria-hidden="true">◎</span>
                <h3>Nenhum chamado encontrado</h3>
                <p>
                  Tente mudar os filtros ou realizar outra pesquisa.
                </p>
              </div>
            )}

            {carregando && (
              <p className="admin-loading">Carregando atendimentos...</p>
            )}
          </div>
        </div>

        <div className="support-card admin-detail-panel">
          <div className="admin-section-heading">
            <div>
              <span className="eyebrow">CENTRAL DE ATENDIMENTO</span>
              <h2>Detalhes do chamado</h2>
            </div>
          </div>

          {!selecionado ? (
            <div className="admin-empty-state admin-detail-empty">
              <span aria-hidden="true">✉</span>
              <h3>Escolha um atendimento</h3>
              <p>
                Selecione um dos chamados à esquerda para visualizar as
                mensagens e responder ao participante.
              </p>
            </div>
          ) : (
            <>
              <div className="admin-detail-header">
                <span className="admin-ticket-protocol">
                  {selecionado.protocolo}
                </span>

                <h3>{selecionado.assunto}</h3>

                <span
                  className={`admin-status ${
                    STATUS_INFO[selecionado.status]?.classe ?? ""
                  }`}
                >
                  <span className="admin-status-dot" />
                  {STATUS_INFO[selecionado.status]?.texto ??
                    selecionado.status}
                </span>
              </div>

              <div className="admin-participant">
                <div className="admin-avatar" aria-hidden="true">
                  {selecionado.nome.trim().charAt(0).toUpperCase() || "P"}
                </div>

                <div>
                  <strong>{selecionado.nome}</strong>
                  <span>{selecionado.email}</span>
                </div>
              </div>

              <div className="admin-detail-meta">
                <div>
                  <span>Categoria</span>
                  <strong>
                    {CATEGORIAS[selecionado.categoria] ??
                      selecionado.categoria}
                  </strong>
                </div>

                <div>
                  <span>Data de abertura</span>
                  <strong>{formatarData(selecionado.criadoEm)}</strong>
                </div>
              </div>

              <label className="admin-status-control">
                <span>Status do atendimento</span>

                <select
                  value={selecionado.status}
                  onChange={(e) =>
                    void atualizarStatus(e.target.value)
                  }
                >
                  <option value="ABERTO">Aberto</option>
                  <option value="EM_ANDAMENTO">Em andamento</option>
                  <option value="RESOLVIDO">Resolvido</option>
                </select>
              </label>

              <div className="admin-conversation-heading">
                <h3>Conversa</h3>
                <span>
                  {selecionado.mensagens.length}{" "}
                  {selecionado.mensagens.length === 1
                    ? "mensagem"
                    : "mensagens"}
                </span>
              </div>

              <div className="admin-conversation">
                {selecionado.mensagens.map((m) => {
                  const ehAdmin = m.autor === "ADMIN";

                  return (
                    <article
                      className={`support-message admin-chat-message ${
                        ehAdmin ? "admin-chat-own" : ""
                      }`}
                      key={m.id}
                    >
                      <div className="admin-message-heading">
                        <strong>
                          {ehAdmin ? "Organização" : selecionado.nome}
                        </strong>

                        {m.criadoEm && (
                          <small>{formatarData(m.criadoEm)}</small>
                        )}
                      </div>

                      <p>{m.mensagem}</p>
                    </article>
                  );
                })}

                {selecionado.mensagens.length === 0 && (
                  <p className="admin-conversation-empty">
                    Ainda não há mensagens neste atendimento.
                  </p>
                )}
              </div>

              {selecionado.status === "RESOLVIDO" ? (
                <div className="admin-resolved-notice">
                  Este chamado está resolvido. Altere o status para outro
                  estado se precisar continuar o atendimento.
                </div>
              ) : (
                <form
                  className="support-form admin-reply-form"
                  onSubmit={enviarResposta}
                >
                  <label>
                    Sua resposta
                    <textarea
                      required
                      minLength={1}
                      maxLength={4000}
                      rows={4}
                      value={resposta}
                      onChange={(e) => setResposta(e.target.value)}
                      placeholder="Escreva uma resposta clara e acolhedora..."
                    />
                  </label>

                  <div className="admin-reply-footer">
                    <span>{resposta.length}/4000 caracteres</span>

                    <button
                      className="button"
                      type="submit"
                      disabled={!resposta.trim() || enviando}
                    >
                      {enviando ? "Enviando..." : "Enviar resposta"}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </section>

      {aviso && (
        <p className="support-notice" role="status">
          {aviso}
        </p>
      )}
    </main>
  );
}
