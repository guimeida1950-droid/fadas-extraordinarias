
import { useEffect, useState } from "react";

const DATA_CORRIDA = new Date("2026-12-06T00:00:00-03:00");

function calcularDiasRestantes() {
  const agora = new Date();

  const hoje = new Date(
    agora.getFullYear(),
    agora.getMonth(),
    agora.getDate()
  );

  const dataEvento = new Date(
    DATA_CORRIDA.getFullYear(),
    DATA_CORRIDA.getMonth(),
    DATA_CORRIDA.getDate()
  );

  return Math.ceil(
    (dataEvento.getTime() - hoje.getTime()) /
      (1000 * 60 * 60 * 24)
  );
}

export default function ContadorCorrida() {
  const [dias, setDias] = useState(calcularDiasRestantes);

  useEffect(() => {
    const atualizar = () => {
      setDias(calcularDiasRestantes());
    };

    const intervalo = window.setInterval(atualizar, 60_000);
    window.addEventListener("focus", atualizar);

    return () => {
      window.clearInterval(intervalo);
      window.removeEventListener("focus", atualizar);
    };
  }, []);

  if (dias <= 0) return null;

  return (
    <aside className="countdown-card" aria-label="Contagem regressiva">
      <strong className="countdown-number">{dias}</strong>

      <span className="countdown-label">
        {dias === 1 ? "DIA FALTANDO" : "DIAS FALTANDO"}
      </span>

      <span className="countdown-caption">
        para a corrida solidária
      </span>
    </aside>
  );
}
