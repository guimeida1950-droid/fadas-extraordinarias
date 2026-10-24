
import { Link } from "react-router-dom";

export default function Causa() {
  return (
    <main>
      <section className="cause-section page-section">
        <div className="cause-copy">
          <span className="eyebrow">NOSSA CAUSA</span>
          <h2>
            A solidariedade
            <br />
            começa com <span>um passo.</span>
          </h2>
          <p>
            A iniciativa busca aproximar pessoas que acreditam no
            poder da colaboração e desejam contribuir com uma causa
            beneficente.
          </p>
          <p>
            Participar é uma oportunidade de compartilhar esperança,
            fortalecer vínculos e mostrar que pequenas atitudes
            podem inspirar grandes mudanças.
          </p>
          <Link className="button button-light" to="/corrida">
            Conheça a corrida <span>↗</span>
          </Link>
        </div>

        <div className="cause-benefits">
          <article>
            <span className="benefit-icon">♡</span>
            <p>Empatia e solidariedade</p>
          </article>
          <article>
            <span className="benefit-icon">☆</span>
            <p>União da comunidade</p>
          </article>
          <article>
            <span className="benefit-icon">✧</span>
            <p>Esperança em movimento</p>
          </article>
        </div>
      </section>

      <section className="about-section">
        <div className="about-copy">
          <span className="eyebrow">FAÇA PARTE</span>
          <h2>
            Vamos caminhar
            <br />
            <span>juntos?</span>
          </h2>
          <p>
            Conheça os detalhes do evento e veja como participar
            da Corrida Fadas Extraordinárias.
          </p>
          <Link className="button" to="/corrida">
            Ver informações <span>↗</span>
          </Link>
        </div>

        <div className="about-art">
          <img src="/logo-fada.jpeg" alt="Fadas Extraordinárias" />
        </div>
      </section>
    </main>
  );
}
