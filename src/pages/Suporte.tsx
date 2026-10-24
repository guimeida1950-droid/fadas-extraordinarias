
import "./Suporte.css";

const FORMULARIO_SUGESTOES =
  "https://docs.google.com/forms/d/e/1FAIpQLSdOG8QIrwJ4S7agjJ6ns3vMuMYwd-yerP7bsIh-pnBXis1HDw/viewform";

export default function Suporte() {
  return (
    <main className="support-page participant-page">
      <section className="support-hero participant-hero">
        <span className="eyebrow">
          Fadas Extraordinárias · Sugestões
        </span>

        <h1>
          Sua opinião <span>transforma!</span>
        </h1>

        <p>
          Queremos construir uma experiência cada vez melhor.
          Compartilhe suas ideias, sugestões e melhorias para o
          Fadas Extraordinárias.
        </p>
      </section>

      <section className="suggestions-card">
        <div className="suggestions-icon" aria-hidden="true">
          ✨
        </div>

        <div className="suggestions-content">
          <span className="suggestions-kicker">
            SUA VOZ IMPORTA
          </span>

          <h2>Ajude o Fadas Extraordinárias a crescer!</h2>

          <p>
            Tem uma ideia para melhorar o site? Gostaria de sugerir
            uma nova funcionalidade, relatar um problema ou propor
            atividades e eventos? Queremos ouvir você!
          </p>

          <a
            className="suggestions-button"
            href={FORMULARIO_SUGESTOES}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar minha sugestão
            <span aria-hidden="true"> ↗</span>
          </a>

          <small>
            O formulário será aberto em uma nova aba.
          </small>
        </div>
      </section>

      <section className="suggestions-info">
        <article>
          <span aria-hidden="true">💡</span>
          <h3>Compartilhe ideias</h3>
          <p>
            Sugira recursos e melhorias que tornem o site ainda melhor.
          </p>
        </article>

        <article>
          <span aria-hidden="true">🛠️</span>
          <h3>Relate problemas</h3>
          <p>
            Ajude-nos a identificar erros e corrigir dificuldades.
          </p>
        </article>

        <article>
          <span aria-hidden="true">🎉</span>
          <h3>Proponha novidades</h3>
          <p>
            Envie ideias para eventos, atividades e novas experiências.
          </p>
        </article>
      </section>
    </main>
  );
}
