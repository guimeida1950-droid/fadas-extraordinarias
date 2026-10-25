
import { Link } from "react-router-dom";
import ContadorCorrida from "../components/ContadorCorrida";

const LINK_INSCRICAO =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_pMeoZ0eLuDuzewnOtifTcYfCuEaF82Z-wQS8jvuSw9Y5eg/viewform";

export default function Inicio() {
  return (
    <main>
      {/* HERO: imagem de fundo, apresentação e contador */}
      <section className="hero" id="inicio">
        <div className="hero-content">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            SOLIDARIEDADE EM MOVIMENTO
          </span>

          <h1>
            Cada passo por
            <br />
            uma causa
            <br />
            <span>extraordinária.</span>
          </h1>

          <p className="hero-description">
            Mais do que uma corrida, um encontro de pessoas que
            acreditam na força da solidariedade. Venha fazer
            parte dessa história com o Instituto FADA.
          </p>

          <div className="hero-actions">
            <a
              className="button"
              href={LINK_INSCRICAO}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inscreva-se agora <span>↗</span>
            </a>

            <Link className="secondary-link" to="/projeto">
              Conheça o projeto <span>↓</span>
            </Link>
          </div>

          <div className="hero-note">
            <span className="heart-icon">♡</span>
            <div>
              <strong>Uma causa que nos une</strong>
              <span>
                Cada pessoa faz a diferença.
              </span>
            </div>
          </div>
        </div>

        {/* O contador fica ao lado do texto, sobre a imagem */}
        <ContadorCorrida />
      </section>

      {/* VALORES */}
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

      {/* SOBRE O PROJETO */}
      <section className="about-section" id="projeto">
        <div className="about-copy">
          <span className="eyebrow">
            CONHEÇA A INICIATIVA
          </span>

          <h2>
            Uma corrida com
            <br />
            um <span>propósito especial.</span>
          </h2>

          <p>
            Conheça o projeto do Instituto FADA e descubra
            como você pode participar dessa iniciativa
            solidária, que busca apoiar pessoas com
            Transtorno do Espectro Autista (TEA).
          </p>

          <Link className="button" to="/projeto">
            Conheça o projeto <span>↗</span>
          </Link>
        </div>

        <div className="about-art">
          <img
            src="/logo-fada.jpeg"
            alt="Logo do Instituto FADA"
          />
          <span className="art-caption">
            Juntas, vamos mais longe!
          </span>
          <span className="art-decoration">✿</span>
        </div>
      </section>

      {/* CAUSA */}
      <section className="cause-section" id="causa">
        <div className="cause-copy">
          <span className="eyebrow">
            FAÇA PARTE DESSA HISTÓRIA
          </span>

          <h2>
            O próximo passo
            <br />
            pode ser <span>o seu.</span>
          </h2>

          <p>
            Cada participante ajuda a fortalecer essa
            iniciativa e a levar a solidariedade mais longe.
            Participe e ajude a construir uma comunidade
            mais acolhedora.
          </p>

          <Link
            className="button button-light"
            to="/causa"
          >
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

      {/* INFORMAÇÕES DA CORRIDA */}
      <section className="race-section" id="corrida">
        <div className="race-details">
          <span className="eyebrow">
            MARQUE NA AGENDA
          </span>

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

          <a
            className="button"
            href={LINK_INSCRICAO}
            target="_blank"
            rel="noopener noreferrer"
          >
            Faça sua inscrição <span>↗</span>
          </a>
        </div>

        <div className="race-message">
          <span className="race-flower">✿</span>

          <h3>Uma causa, muitos passos.</h3>

          <p>
            Prepare-se para fazer parte desse movimento
            de solidariedade. Cada passo importa!
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
