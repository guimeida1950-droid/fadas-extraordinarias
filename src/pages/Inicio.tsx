
import { Link } from "react-router-dom";

const LINK_INSCRICAO =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_pMeoZ0eLuDuzewnOtifTcYfCuEaF82Z-wQS8jvuSw9Y5eg/viewform";

export default function Inicio() {
  return (
    <main>
      <section className="hero" id="inicio">
        <div className="hero-content">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            SOLIDARIEDADE EM MOVIMENTO
          </span>

          <h1>
            Cada passo
            <br />
            por uma causa
            <br />
            <span>extraordinária.</span>
          </h1>

          <p className="hero-description">
            O Fadas Extraordinárias é uma iniciativa solidária que une
            pessoas em apoio ao Instituto FADA e ao seu trabalho com
            pessoas com Transtorno do Espectro Autista (TEA).
            Participe dessa corrente de inclusão e solidariedade.
          </p>

          <div className="hero-actions">
            <a
              className="button"
              href={LINK_INSCRICAO}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero me inscrever <span>↗</span>
            </a>

            <Link className="secondary-link" to="/projeto">
              Conheça o projeto <span>↓</span>
            </Link>
          </div>

          <div className="hero-note">
            <span className="heart-icon">♡</span>
            <div>
              <strong>Mais que participar, fazer a diferença</strong>
              <span>Uma iniciativa de inclusão e solidariedade.</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <img
            className="hero-logo"
            src="/logo-fada.jpeg"
            alt="Fadas Extraordinárias"
          />
          <span className="decorative-star star-one">✦</span>
          <span className="decorative-star star-two">✧</span>
          <span className="decorative-flower">✿</span>
        </div>
      </section>

      <section className="values-strip">
        <div className="values-heading">
          <h2>Nossos valores</h2>
          <p>O que nos move</p>
        </div>

        <article className="value-item">
          <span className="value-icon">♡</span>
          <span className="value-number">01</span>
          <h3>Solidariedade</h3>
          <p>Unidos para apoiar uma causa.</p>
        </article>

        <article className="value-item">
          <span className="value-icon">♧</span>
          <span className="value-number">02</span>
          <h3>Inclusão</h3>
          <p>Respeito às diferenças e à diversidade.</p>
        </article>

        <article className="value-item">
          <span className="value-icon">❀</span>
          <span className="value-number">03</span>
          <h3>Transformação</h3>
          <p>Atitudes que podem gerar impacto positivo.</p>
        </article>
      </section>

      <section className="about-section">
        <div className="about-copy">
          <span className="eyebrow">CONHEÇA NOSSO PROPÓSITO</span>
          <h2>
            Uma iniciativa
            <br />
            com <span>um propósito especial.</span>
          </h2>
          <p>
            O Fadas Extraordinárias promove a solidariedade por meio
            do esporte e direciona a atenção para o trabalho do
            Instituto FADA com pessoas com Transtorno do Espectro
            Autista (TEA). Queremos mobilizar a comunidade em torno
            dessa causa e incentivar mais pessoas a fazer parte dela.
          </p>
          <Link className="button" to="/projeto">
            Conheça o projeto <span>↗</span>
          </Link>
        </div>

        <div className="about-art">
          <img
            src="/logo-fada.jpeg"
            alt="Identidade visual do Fadas Extraordinárias"
          />
          <span className="art-caption">
            Juntos, construímos uma sociedade mais inclusiva.
          </span>
          <span className="art-decoration">✿</span>
        </div>
      </section>

      <section className="cause-section">
        <div className="cause-copy">
          <span className="eyebrow">O IMPACTO DA SUA PARTICIPAÇÃO</span>
          <h2>
            Sua participação
            <br />
            fortalece <span>essa causa.</span>
          </h2>
          <p>
            Ao participar da corrida solidária, você ajuda a dar
            visibilidade à causa do autismo e a apoiar a iniciativa
            em benefício do Instituto FADA. Cada participante
            contribui para levar essa mensagem mais longe.
          </p>
          <Link className="button button-light" to="/causa">
            Conheça nossa causa <span>↗</span>
          </Link>
        </div>

        <div className="cause-benefits">
          <article>
            <span className="benefit-icon">♡</span>
            <p>Apoio ao Instituto FADA</p>
          </article>
          <article>
            <span className="benefit-icon">☆</span>
            <p>Mais visibilidade para a causa do autismo</p>
          </article>
          <article>
            <span className="benefit-icon">✧</span>
            <p>Uma comunidade mais inclusiva e solidária</p>
          </article>
        </div>
      </section>

      <section className="race-section">
        <div className="race-details">
          <span className="eyebrow">PARTICIPE DESSA INICIATIVA</span>
          <h2>
            Faça parte
            <br />
            <span>dessa transformação.</span>
          </h2>

          <p>
            Corra, caminhe ou venha apoiar essa iniciativa. O importante
            é fazer parte de um movimento que une pessoas em torno de
            uma causa especial.
          </p>

          <div className="event-detail">
            <span className="detail-icon">▦</span>
            <div>
              <strong>Data</strong>
              <p>6 de dezembro de 2026</p>
            </div>
          </div>

          <div className="event-detail">
            <span className="detail-icon">⌖</span>
            <div>
              <strong>Local</strong>
              <p>Parque Cemucam, Cotia – SP</p>
            </div>
          </div>

          <a
            className="button"
            href={LINK_INSCRICAO}
            target="_blank"
            rel="noopener noreferrer"
          >
            Garantir minha inscrição <span>↗</span>
          </a>
        </div>

        <div className="race-message">
          <span className="race-flower">✿</span>
          <h3>Um movimento que vai além do esporte.</h3>
          <p>
            Reúna seus amigos, convide sua família e venha demonstrar
            seu apoio à inclusão e à solidariedade. Cada pessoa que
            participa ajuda essa causa a alcançar mais pessoas.
          </p>
          <a
            className="secondary-link"
            href={LINK_INSCRICAO}
            target="_blank"
            rel="noopener noreferrer"
          >
            Inscreva-se pelo Google Forms <span>↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
