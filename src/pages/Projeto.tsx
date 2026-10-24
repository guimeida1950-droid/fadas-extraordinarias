
import { Link } from "react-router-dom";

export default function Projeto() {
  return (
    <main>
      <section className="about-section page-section">
        <div className="about-copy">
          <span className="eyebrow">QUEM SOMOS</span>
          <h2>
            Um projeto com
            <br />
            <span>propósito e coração.</span>
          </h2>
          <p>
            A Corrida Fadas Extraordinárias é uma iniciativa beneficente
            ligada ao Instituto FADA, criada para reunir pessoas em torno
            da solidariedade e incentivar a participação da comunidade.
          </p>
          <p>
            Acreditamos que cada pessoa pode contribuir para uma
            transformação positiva. Um passo pode parecer pequeno,
            mas muitos passos juntos podem abrir novos caminhos.
          </p>
          <Link className="button" to="/corrida">
            Conheça o evento <span>↗</span>
          </Link>
        </div>

        <div className="about-art">
          <img src="/logo-fada.jpeg" alt="Fadas Extraordinárias" />
          <span className="art-caption">Juntas, vamos mais longe!</span>
        </div>
      </section>

      <section className="values-strip">
        <div className="values-heading">
          <h2>O que nos inspira</h2>
          <p>Nossos pilares</p>
        </div>
        <article className="value-item">
          <span className="value-icon">♡</span>
          <h3>Empatia</h3>
          <p>Olhar para o próximo com carinho.</p>
        </article>
        <article className="value-item">
          <span className="value-icon">♧</span>
          <h3>União</h3>
          <p>Construir juntos uma comunidade.</p>
        </article>
        <article className="value-item">
          <span className="value-icon">❀</span>
          <h3>Esperança</h3>
          <p>Transformar boas intenções em ações.</p>
        </article>
      </section>
    </main>
  );
}
