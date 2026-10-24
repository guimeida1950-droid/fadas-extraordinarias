
const LINK_INSCRICAO =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_pMeoZ0eLuDuzewnOtifTcYfCuEaF82Z-wQS8jvuSw9Y5eg/viewform";

export default function Corrida() {
  return (
    <main>
      <section className="race-section page-section">
        <div className="race-details">
          <span className="eyebrow">PREPARE-SE PARA PARTICIPAR</span>
          <h2>
            Corrida
            <br />
            <span>Fadas Extraordinárias</span>
          </h2>

          <div className="event-detail">
            <span className="detail-icon">▦</span>
            <div>
              <strong>Data do evento</strong>
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

          <div className="event-detail">
            <span className="detail-icon">♡</span>
            <div>
              <strong>Modalidades disponíveis no formulário</strong>
              <p>Corrida de 5 km e caminhada</p>
            </div>
          </div>

          <p>
            Consulte o formulário oficial para preencher seus dados
            e conferir as informações solicitadas para inscrição.
          </p>

          <a
            className="button"
            href={LINK_INSCRICAO}
            target="_blank"
            rel="noopener noreferrer"
          >
            Inscreva-se pelo Google Forms <span>↗</span>
          </a>
        </div>

        <div className="race-message">
          <span className="race-flower">✿</span>
          <h3>Seu próximo passo pode fazer a diferença.</h3>
          <p>
            Reúna sua família e seus amigos para participar desta
            iniciativa de solidariedade.
          </p>
        </div>
      </section>
    </main>
  );
}
