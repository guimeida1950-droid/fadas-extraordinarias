
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
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
  assunto: string;
  categoria: string;
  status: string;
  criadoEm: string | null;
  mensagens: Mensagem[];
};

type ErroApi = {
  message?: string;
  mensagem?: string;
  error?: string;
};

async function lerErro(res: Response, padrao: string) {
  try {
    const dados = (await res.json()) as ErroApi;
    return (
      dados.message ||
      dados.mensagem ||
      dados.error ||
      `${padrao} (HTTP ${res.status})`
    );
  } catch {
    return `${padrao} (HTTP ${res.status})`;
  }
}

async function requisicaoSuporte(
  usuario: User,
  caminho: string,
  options: RequestInit = {}
) {
  const token = await usuario.getIdToken();

  const res = await fetch(`${API}/suporte${caminho}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      await lerErro(res, "Não foi possível acessar o suporte.")
    );
  }

  return res.json();
}

function mensagemErro(err: unknown) {
  if (err instanceof TypeError) {
    return "Não foi possível conectar ao servidor. Confira se o backend está ligado na porta 8080.";
  }

  return err instanceof Error
    ? err.message
    : "Ocorreu um erro inesperado.";
}

function textoStatus(status: string) {
  switch (status) {
    case "ABERTO":
      return "Aberto";
    case "EM_ANDAMENTO":
      return "Em atendimento";
    case "RESOLVIDO":
      return "Resolvido";
    default:
      return status.replaceAll("_", " ");
  }
}

function classeStatus(status: string) {
  switch (status) {
    case "ABERTO":
      return "participant-status participant-status-open";
    case "EM_ANDAMENTO":
      return "participant-status participant-status-progress";
    case "RESOLVIDO":
      return "participant-status participant-status-resolved";
    default:
      return "participant-status";
  }
}

function textoCategoria(categoria: string) {
  switch (categoria) {
    case "DUVIDA":
      return "Dúvida";
    case "SUGESTAO":
      return "Sugestão";
    case "RECLAMACAO":
      return "Reclamação";
    case "OUTRO":
      return "Outro assunto";
    default:
      return categoria;
  }
}

function dataFormatada(data: string | null) {
  if (!data) return "Data não disponível";

  const dataObj = new Date(data);

  if (Number.isNaN(dataObj.getTime())) {
    return "Data não disponível";
  }

  return dataObj.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Suporte() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [verificandoLogin, setVerificandoLogin] = useState(true);

  const [categoria, setCategoria] = useState("DUVIDA");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState("");

  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [aviso, setAviso] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setVerificandoLogin(false);
    });

    return cancelar;
  }, []);

  const carregarChamados = useCallback(async (user: User) => {
    const dados = (await requisicaoSuporte(
      user,
      "/meus-chamados"
    )) as Chamado[];

    setChamados(dados);

    setChamado((atual) => {
      if (!atual) return null;
      return dados.find((item) => item.id === atual.id) ?? null;
    });
  }, []);

  useEffect(() => {
    if (!usuario) {
      setChamados([]);
      setChamado(null);
      return;
    }

    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setAviso("");

      try {
        const dados = (await requisicaoSuporte(
          usuario!,
          "/meus-chamados"
        )) as Chamado[];

        if (ativo) {
          setChamados(dados);
        }
      } catch (err) {
        if (ativo) setAviso(mensagemErro(err));
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregar();

    return () => {
      ativo = false;
    };
  }, [usuario]);

  async function criarChamado(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!usuario) {
      setAviso("Entre com sua conta Google para abrir um chamado.");
      return;
    }

    if (assunto.trim().length === 0 || mensagem.trim().length < 5) {
      setAviso("Preencha o assunto e escreva uma mensagem com pelo menos 5 caracteres.");
      return;
    }

    setCarregando(true);
    setAviso("");

    try {
      const novo = (await requisicaoSuporte(
        usuario,
        "/meus-chamados",
        {
          method: "POST",
          body: JSON.stringify({
            categoria,
            assunto: assunto.trim(),
            mensagem: mensagem.trim(),
          }),
        }
      )) as Chamado;

      setChamados((anteriores) => [
        novo,
        ...anteriores.filter((item) => item.id !== novo.id),
      ]);

      setChamado(novo);
      setCategoria("DUVIDA");
      setAssunto("");
      setMensagem("");
      setAviso("Chamado criado com sucesso! Você já pode acompanhar o atendimento.");
    } catch (err) {
      setAviso(mensagemErro(err));
    } finally {
      setCarregando(false);
    }
  }

  async function abrirChamado(id: number) {
    if (!usuario) return;

    setCarregando(true);
    setAviso("");
    setResposta("");

    try {
      const dados = (await requisicaoSuporte(
        usuario,
        `/meus-chamados/${id}`
      )) as Chamado;

      setChamado(dados);
    } catch (err) {
      setAviso(mensagemErro(err));
    } finally {
      setCarregando(false);
    }
  }

  async function enviarMensagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!usuario || !chamado || !resposta.trim()) return;

    if (chamado.status === "RESOLVIDO") {
      setAviso("Este chamado já foi resolvido.");
      return;
    }

    setCarregando(true);
    setAviso("");

    try {
      const atualizado = (await requisicaoSuporte(
        usuario,
        `/meus-chamados/${chamado.id}/mensagens`,
        {
          method: "POST",
          body: JSON.stringify({ mensagem: resposta.trim() }),
        }
      )) as Chamado;

      setChamado(atualizado);
      setChamados((anteriores) =>
        anteriores.map((item) =>
          item.id === atualizado.id ? atualizado : item
        )
      );

      setResposta("");
      setAviso("Mensagem enviada com sucesso.");
    } catch (err) {
      setAviso(mensagemErro(err));
    } finally {
      setCarregando(false);
    }
  }

  async function atualizarLista() {
    if (!usuario) return;

    setCarregando(true);
    setAviso("");

    try {
      await carregarChamados(usuario);
      setAviso("Seus chamados foram atualizados.");
    } catch (err) {
      setAviso(mensagemErro(err));
    } finally {
      setCarregando(false);
    }
  }

  const abertos = chamados.filter(
    (item) => item.status === "ABERTO"
  ).length;

  const emAtendimento = chamados.filter(
    (item) => item.status === "EM_ANDAMENTO"
  ).length;

  const resolvidos = chamados.filter(
    (item) => item.status === "RESOLVIDO"
  ).length;

  if (verificandoLogin) {
    return (
      <main className="support-page">
        <section className="support-loading-card">
          <span className="support-loading-icon">✦</span>
          <h2>Preparando sua central de suporte</h2>
          <p>Estamos verificando sua sessão...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="support-page participant-page">
      <section className="support-hero participant-hero">
        <span className="eyebrow">Fadas Extraordinárias · Atendimento</span>

        <h1>
          Como podemos <span>ajudar?</span>
        </h1>

        <p>
          Tire suas dúvidas, envie sugestões e acompanhe suas conversas
          com a organização em um só lugar.
        </p>

        {usuario && (
          <div className="participant-welcome">
            <div className="participant-avatar">
              {(usuario.displayName || usuario.email || "P")
                .trim()
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <span>Bem-vindo(a) à central</span>
              <strong>{usuario.displayName || "Participante"}</strong>
              <small>{usuario.email}</small>
            </div>
          </div>
        )}
      </section>

      {!usuario ? (
        <section className="support-card participant-login-card">
          <div className="participant-card-icon">✦</div>
          <span className="participant-kicker">Área do participante</span>
          <h2>Seu atendimento começa aqui</h2>

          <p>
            Entre com sua conta Google utilizada no Corrida Fada para
            abrir solicitações e acompanhar as respostas da equipe.
          </p>

          <div className="participant-login-steps">
            <div>
              <span>01</span>
              <p>Entre na sua conta Google.</p>
            </div>
            <div>
              <span>02</span>
              <p>Envie sua dúvida ou solicitação.</p>
            </div>
            <div>
              <span>03</span>
              <p>Acompanhe o atendimento por aqui.</p>
            </div>
          </div>

          <p className="participant-login-hint">
            Faça login pelo site e volte a esta página para acessar o suporte.
          </p>
        </section>
      ) : (
        <>
          <section className="participant-overview">
            <div className="participant-overview-heading">
              <div>
                <span className="participant-kicker">Seu espaço</span>
                <h2>Resumo dos atendimentos</h2>
              </div>

              <button
                type="button"
                className="participant-refresh"
                onClick={() => void atualizarLista()}
                disabled={carregando}
                aria-label="Atualizar chamados"
                title="Atualizar chamados"
              >
                ↻
              </button>
            </div>

            <div className="participant-stats">
              <article className="participant-stat">
                <span className="participant-stat-icon stat-icon-total">▤</span>
                <div>
                  <small>Total de chamados</small>
                  <strong>{chamados.length}</strong>
                </div>
              </article>

              <article className="participant-stat">
                <span className="participant-stat-icon stat-icon-open">◷</span>
                <div>
                  <small>Aguardando atendimento</small>
                  <strong>{abertos}</strong>
                </div>
              </article>

              <article className="participant-stat">
                <span className="participant-stat-icon stat-icon-progress">↗</span>
                <div>
                  <small>Em atendimento</small>
                  <strong>{emAtendimento}</strong>
                </div>
              </article>

              <article className="participant-stat">
                <span className="participant-stat-icon stat-icon-resolved">✓</span>
                <div>
                  <small>Resolvidos</small>
                  <strong>{resolvidos}</strong>
                </div>
              </article>
            </div>
          </section>

          <div className="participant-workspace">
            <div className="participant-main-column">
              <section className="support-card participant-form-card">
                <div className="participant-section-heading">
                  <div className="participant-section-icon">✉</div>
                  <div>
                    <span className="participant-kicker">Estamos aqui para ouvir</span>
                    <h2>Abra um chamado</h2>
                    <p>Explique como podemos ajudar você.</p>
                  </div>
                </div>

                <form onSubmit={criarChamado} className="support-form">
                  <label>
                    Qual é o motivo do contato?
                    <select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      required
                    >
                      <option value="DUVIDA">Dúvida</option>
                      <option value="SUGESTAO">Sugestão</option>
                      <option value="RECLAMACAO">Reclamação</option>
                      <option value="OUTRO">Outro assunto</option>
                    </select>
                  </label>

                  <label>
                    Assunto
                    <input
                      required
                      minLength={2}
                      maxLength={150}
                      placeholder="Ex.: dúvida sobre a inscrição"
                      value={assunto}
                      onChange={(e) => setAssunto(e.target.value)}
                    />
                    <small className="participant-field-hint">
                      Resuma o motivo do seu contato.
                    </small>
                  </label>

                  <label>
                    Descreva sua solicitação
                    <textarea
                      required
                      minLength={5}
                      maxLength={4000}
                      rows={5}
                      placeholder="Conte os detalhes para que nossa equipe possa ajudar..."
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                    />
                    <small className="participant-character-count">
                      {mensagem.length}/4000 caracteres
                    </small>
                  </label>

                  <button
                    className="button participant-submit"
                    disabled={carregando}
                    type="submit"
                  >
                    {carregando ? "Processando..." : "Enviar chamado"}
                    {!carregando && <span aria-hidden="true"> →</span>}
                  </button>

                  <p className="participant-privacy-note">
                    Sua solicitação ficará vinculada à sua conta.
                  </p>
                </form>
              </section>

              <section className="support-card participant-tickets-card">
                <div className="participant-section-heading participant-list-heading">
                  <div>
                    <span className="participant-kicker">Histórico</span>
                    <h2>Meus chamados</h2>
                    <p>Selecione um chamado para consultar a conversa.</p>
                  </div>

                  <span className="participant-count">
                    {chamados.length}
                  </span>
                </div>

                {carregando && chamados.length === 0 ? (
                  <div className="participant-empty">
                    <span className="participant-empty-icon">◌</span>
                    <h3>Carregando seus chamados</h3>
                    <p>Estamos buscando suas solicitações.</p>
                  </div>
                ) : chamados.length === 0 ? (
                  <div className="participant-empty">
                    <span className="participant-empty-icon">✉</span>
                    <h3>Nenhum chamado por enquanto</h3>
                    <p>
                      Quando você enviar sua primeira solicitação, ela aparecerá
                      aqui para acompanhamento.
                    </p>
                  </div>
                ) : (
                  <div className="support-ticket-list">
                    {chamados.map((item) => (
                      <button
                        type="button"
                        className={`support-ticket-item ${
                          chamado?.id === item.id
                            ? "support-ticket-item-active"
                            : ""
                        }`}
                        key={item.id}
                        onClick={() => void abrirChamado(item.id)}
                        disabled={carregando}
                        aria-pressed={chamado?.id === item.id}
                      >
                        <div className="participant-ticket-top">
                          <span className="participant-ticket-symbol">#</span>
                          <span className={classeStatus(item.status)}>
                            <span className="participant-status-dot" />
                            {textoStatus(item.status)}
                          </span>
                        </div>

                        <strong className="participant-ticket-subject">
                          {item.assunto}
                        </strong>

                        <span className="participant-ticket-protocol">
                          {item.protocolo}
                        </span>

                        <div className="participant-ticket-bottom">
                          <span>{textoCategoria(item.categoria)}</span>
                          <span>{dataFormatada(item.criadoEm)}</span>
                        </div>

                        <span className="participant-ticket-link">
                          Ver conversa <span aria-hidden="true">→</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <section className="support-card participant-chat-card">
              {!chamado ? (
                <div className="participant-chat-empty">
                  <div className="participant-chat-empty-art">
                    <span>✉</span>
                  </div>
                  <span className="participant-kicker">Central de mensagens</span>
                  <h2>Sua conversa aparecerá aqui</h2>
                  <p>
                    Escolha um chamado na lista para visualizar as mensagens
                    e conversar com a equipe Fadas Extraordinárias.
                  </p>
                  <div className="participant-chat-tip">
                    <span>✦</span>
                    Suas conversas ficam associadas à sua conta.
                  </div>
                </div>
              ) : (
                <>
                  <header className="participant-chat-header">
                    <div className="participant-chat-header-icon">✉</div>
                    <div className="participant-chat-title">
                      <span className="participant-kicker">Atendimento</span>
                      <h2>{chamado.assunto}</h2>
                      <p>{chamado.protocolo}</p>
                    </div>
                    <span className={classeStatus(chamado.status)}>
                      <span className="participant-status-dot" />
                      {textoStatus(chamado.status)}
                    </span>
                  </header>

                  <div className="participant-chat-details">
                    <span>
                      <small>Categoria</small>
                      <strong>{textoCategoria(chamado.categoria)}</strong>
                    </span>
                    <span>
                      <small>Criado em</small>
                      <strong>{dataFormatada(chamado.criadoEm)}</strong>
                    </span>
                  </div>

                  <div className="participant-chat-notice">
                    <span>✦</span>
                    <p>
                      Mantenha suas mensagens nesta conversa para facilitar
                      o acompanhamento da sua solicitação.
                    </p>
                  </div>

                  <div className="participant-chat-messages" aria-live="polite">
                    {!chamado.mensagens?.length ? (
                      <div className="participant-no-messages">
                        <span>✉</span>
                        <p>Ainda não há mensagens nesta conversa.</p>
                      </div>
                    ) : (
                      chamado.mensagens.map((item) => {
                        const daOrganizacao = item.autor === "ADMIN";

                        return (
                          <article
                            className={`participant-chat-message ${
                              daOrganizacao
                                ? "participant-message-team"
                                : "participant-message-user"
                            }`}
                            key={item.id}
                          >
                            <div className="participant-message-author">
                              <span className="participant-message-avatar">
                                {daOrganizacao ? "F" : "V"}
                              </span>
                              <div>
                                <strong>
                                  {daOrganizacao ? "Equipe de suporte" : "Você"}
                                </strong>
                                {item.criadoEm && (
                                  <small>{dataFormatada(item.criadoEm)}</small>
                                )}
                              </div>
                            </div>

                            <p>{item.mensagem}</p>
                          </article>
                        );
                      })
                    )}
                  </div>

                  {chamado.status !== "RESOLVIDO" ? (
                    <form
                      onSubmit={enviarMensagem}
                      className="participant-reply-form"
                    >
                      <label htmlFor="participant-reply">
                        Responder à equipe
                      </label>
                      <textarea
                        id="participant-reply"
                        required
                        minLength={1}
                        maxLength={4000}
                        rows={3}
                        placeholder="Escreva sua mensagem..."
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                      />

                      <div className="participant-reply-footer">
                        <small>{resposta.length}/4000 caracteres</small>
                        <button
                          className="button participant-submit"
                          disabled={carregando || !resposta.trim()}
                          type="submit"
                        >
                          {carregando ? "Enviando..." : "Enviar resposta"}
                          {!carregando && <span aria-hidden="true"> →</span>}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="participant-resolved-notice">
                      <span>✓</span>
                      <div>
                        <strong>Atendimento concluído</strong>
                        <p>
                          Este chamado foi marcado como resolvido e não aceita
                          novas mensagens.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </>
      )}

      {aviso && (
        <div
          className="support-notice participant-notice"
          role="status"
          aria-live="polite"
        >
          <span aria-hidden="true">✦</span>
          <p>{aviso}</p>
          <button
            type="button"
            onClick={() => setAviso("")}
            aria-label="Fechar aviso"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
