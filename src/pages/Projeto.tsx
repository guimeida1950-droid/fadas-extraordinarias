
import { Link } from "react-router-dom";

const LINK_INSCRICAO =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_pMeoZ0eLuDuzewnOtifTcYfCuEaF82Z-wQS8jvuSw9Y5eg/viewform";

export default function Projeto() {
  return (
    <main className="projeto-page">
      {/* APRESENTAÇÃO */}
      <section className="about-section page-section">
        <div className="about-copy">
          <span className="eyebrow">
            CONHEÇA NOSSA INICIATIVA
          </span>

          <h2>
            Mais do que uma corrida,
            <br />
            <span>um propósito que nos une.</span>
          </h2>

          <p>
            A Corrida Fadas Extraordinárias é uma iniciativa
            beneficente ligada ao Instituto FADA. A proposta
            é reunir pessoas em torno da solidariedade e
            incentivar a participação da comunidade em uma
            causa importante.
          </p>

          <p>
            Acreditamos que pequenos gestos podem aproximar
            pessoas, ampliar o diálogo e incentivar atitudes
            mais acolhedoras. Cada participante faz parte
            dessa construção coletiva.
          </p>

          <div className="hero-actions">
            <a
              className="button"
              href={LINK_INSCRICAO}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero participar <span>↗</span>
            </a>

            <Link className="secondary-link" to="/corrida">
              Conheça a corrida <span>↓</span>
            </Link>
          </div>
        </div>

        <div className="projeto-highlight">
          <span className="highlight-symbol">♡</span>
          <span className="eyebrow">NOSSO PROPÓSITO</span>
          <h3>
            Cada passo pode aproximar pessoas e fortalecer
            uma causa.
          </h3>
          <p>
            Solidariedade, respeito e participação caminham
            juntos.
          </p>
        </div>
      </section>

      {/* SOBRE A CAUSA */}
      <section className="about-section page-section">
        <div className="about-copy">
          <span className="eyebrow">NOSSA CAUSA</span>

          <h2>
            Um mundo com mais
            <br />
            <span>respeito e inclusão.</span>
          </h2>

          <p>
            O Instituto FADA está ligado à causa das pessoas
            com Transtorno do Espectro Autista (TEA). Essa
            causa nos convida a refletir sobre acolhimento,
            respeito às individualidades e participação
            na sociedade.
          </p>

          <p>
            A inclusão vai além de reconhecer as diferenças.
            Ela também envolve ouvir, compreender e criar
            ambientes em que as pessoas sejam tratadas com
            dignidade e respeito.
          </p>

          <p>
            A corrida é uma oportunidade de reunir a
            comunidade em torno desse propósito e ampliar
            a visibilidade da iniciativa.
          </p>
        </div>

        <div className="projeto-highlight projeto-highlight-soft">
          <span className="highlight-symbol">✳</span>
          <span className="eyebrow">INCLUSÃO NA PRÁTICA</span>
          <h3>
            Diferentes pessoas, histórias e possibilidades.
          </h3>
          <p>
            Uma comunidade mais acolhedora começa com
            respeito e atitudes conscientes.
          </p>
        </div>
      </section>

<section className="about-section page-section">
  <div className="about-copy">
    <span className="eyebrow">
      O IMPACTO DA SOLIDARIEDADE
    </span>

    <h2>
      Sua participação pode
      <br />
      <span>ajudar a transformar vidas.</span>
    </h2>

    <p>
      O Instituto FADA trabalha para promover o
      desenvolvimento, o convívio social e a qualidade
      de vida de pessoas com Transtorno do Espectro
      Autista (TEA) e de suas famílias.
    </p>

    <p>
      Em campanhas anteriores, a instituição buscou
      arrecadar recursos para ampliar o acesso ao
      atendimento e reduzir a fila de espera. Essas
      iniciativas mostram como o apoio da comunidade
      pode contribuir para a continuidade e a expansão
      do trabalho da instituição.
    </p>

    <p>
      Ao participar da Corrida Fadas Extraordinárias,
      você ajuda a dar visibilidade a essa causa e
      fortalece uma iniciativa que reúne pessoas em
      torno da solidariedade.
    </p>

    <a
      className="secondary-link"
      href="https://www.fada.org.br/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Conheça a instituição <span>↗</span>
    </a>
  </div>

  <div className="projeto-highlight">
    <span className="highlight-symbol">♡</span>

    <span className="eyebrow">
      SOLIDARIEDADE EM AÇÃO
    </span>

    <h3>
      Mais acolhimento, oportunidades
      e qualidade de vida.
    </h3>

    <p>
      Conhecer a causa é o primeiro passo para
      participar de forma consciente.
    </p>
  </div>
</section>

      {/* VALORES */}
      <section className="values-strip">
        <div className="values-heading">
          <h2>O que nos inspira</h2>
          <p>Nossos pilares</p>
        </div>

        <article className="value-item">
          <span className="value-icon">♡</span>
          <span className="value-number">01</span>
          <h3>Empatia</h3>
          <p>Olhar para o próximo com compreensão.</p>
        </article>

        <article className="value-item">
          <span className="value-icon">♧</span>
          <span className="value-number">02</span>
          <h3>União</h3>
          <p>Construir juntos uma comunidade solidária.</p>
        </article>

        <article className="value-item">
          <span className="value-icon">❀</span>
          <span className="value-number">03</span>
          <h3>Inclusão</h3>
          <p>Valorizar as diferenças e respeitar cada pessoa.</p>
        </article>
      </section>

      {/* COMO PARTICIPAR */}
      <section className="cause-section">
        <div className="cause-copy">
          <span className="eyebrow">
            SUA PARTICIPAÇÃO IMPORTA
          </span>

          <h2>
            Uma causa,
            <br />
            <span>muitos passos.</span>
          </h2>

          <p>
            Você pode participar da corrida, convidar amigos
            e familiares e compartilhar a iniciativa com
            outras pessoas. Assim, ajuda a ampliar o alcance
            do projeto e a conversa sobre inclusão.
          </p>

          <a
            className="button button-light"
            href={LINK_INSCRICAO}
            target="_blank"
            rel="noopener noreferrer"
          >
            Faça sua inscrição <span>↗</span>
          </a>
        </div>

        <div className="cause-benefits">
          <article>
            <span className="benefit-icon">♡</span>
            <p>Participe de uma iniciativa solidária</p>
          </article>

          <article>
            <span className="benefit-icon">☆</span>
            <p>Ajude a divulgar a importância da inclusão</p>
          </article>

          <article>
            <span className="benefit-icon">✧</span>
            <p>Convide outras pessoas para fazer parte</p>
          </article>
        </div>
      </section>

      {/* INFORMAÇÕES DO EVENTO */}
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
            Ver detalhes do evento <span>↗</span>
          </Link>
        </div>

        <div className="race-message">
          <span className="race-flower">✿</span>

          <h3>O primeiro passo pode ser seu.</h3>

          <p>
            Conheça o evento, confira as informações e
            participe dessa iniciativa de solidariedade.
          </p>

          <a
            className="secondary-link"
            href={LINK_INSCRICAO}
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar inscrição <span>↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
