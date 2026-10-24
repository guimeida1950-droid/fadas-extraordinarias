
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
            Juntos, cada
            <br />
            passo pode
            <br />
            <span>transformar.</span>
          </h1>

          <p className="hero-description">
            Mais do que uma corrida, um encontro de pessoas que acreditam
            na força da solidariedade. Venha fazer parte dessa história.
          </p>

          <div className="hero-actions">
            <Link className="button" to="/corrida">
              Descubra a corrida <span>↗</span>
            </Link>

            <Link className="secondary-link" to="/projeto">
              Conheça o projeto <span>↓</span>
            </Link>
          </div>

          <div className="hero-note">
            <span className="heart-icon">♡</span>
            <div>
              <strong>Uma causa que nos une</strong>
              <span>Cada pessoa faz a diferença.</span>
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
          <p>Unidos por uma causa.</p>
        </article>

        <article className="value-item">
          <span className="value-icon">♧</span>
          <span className="value-number">02</span>
          <h3>Comunidade</h3>
          <p>Juntos somos mais fortes.</p>
        </article>

        <article className="value-item">
          <span className="value-icon">❀</span>
          <span className="value-number">03</span>
          <h3>Transformação</h3>
          <p>Pequenos passos, grandes impactos.</p>
        </article>
      </section>

      <section className="about-section">
        <div className="about-copy">
          <span className="eyebrow">CONHEÇA A INICIATIVA</span>
          <h2>
            Uma corrida com
            <br />
            um <span>propósito especial.</span>
          </h2>
          <p>
            Conheça o projeto do Instituto FADA e descubra como
            você pode participar dessa iniciativa solidária.
          </p>
          <Link className="button" to="/projeto">
            Conheça o projeto <span>↗</span>
          </Link>
        </div>

        <div className="about-art">
          <img src="/logo-fada.jpeg" alt="Identidade visual do evento" />
          <span className="art-caption">Juntas, vamos mais longe!</span>
          <span className="art-decoration">✿</span>
        </div>
      </section>

      <section className="cause-section">
        <div className="cause-copy">
          <span className="eyebrow">FAÇA PARTE DESSA HISTÓRIA</span>
          <h2>
            O próximo passo
            <br />
            pode ser <span>o seu.</span>
          </h2>
          <p>
            Cada participante ajuda a fortalecer essa iniciativa
            e a levar a solidariedade mais longe.
          </p>
          <Link className="button button-light" to="/causa">
            Conheça nossa causa <span>↗</span>
          </Link>
        </div>

        <div className="cause-benefits">
          <article>
            <span className="benefit-icon">♡</span>
            <p>Mais união e solidariedade</p>
          </article>
          <article>
            <span className="benefit-icon">☆</span>
            <p>Apoio a uma causa especial</p>
          </article>
          <article>
            <span className="benefit-icon">✧</span>
            <p>Uma comunidade mais forte</p>
          </article>
        </div>
      </section>

      <section className="race-section">
        <div className="race-details">
          <span className="eyebrow">MARQUE NA AGENDA</span>
          <h2>
            Corrida
            <br />
            <span>Fadas Extraordinárias</span>
          </h2>

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

          <Link className="button" to="/corrida">
            Ver detalhes da corrida <span>↗</span>
          </Link>
        </div>

        <div className="race-message">
          <span className="race-flower">✿</span>
          <h3>Uma causa, muitos passos.</h3>
          <p>
            Conheça as informações do evento e prepare-se para
            fazer parte desse movimento de solidariedade.
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
