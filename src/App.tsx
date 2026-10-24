
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import "./App.css";

import Inicio from "./pages/Inicio";
import Projeto from "./pages/Projeto";
import Corrida from "./pages/Corrida";
import Causa from "./pages/Causa";
import Suporte from "./pages/Suporte";
import AdminSuporte from "./pages/AdminSuporte";

const LINK_INSCRICAO =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_pMeoZ0eLuDuzewnOtifTcYfCuEaF82Z-wQS8jvuSw9Y5eg/viewform";

function Cabecalho() {
  return (
    <header className="navbar">
      <Link className="brand" to="/" aria-label="Página inicial">
        <img src="/logo-fada.jpeg" alt="Fadas Extraordinárias" />
      </Link>

      <nav className="nav-links" aria-label="Navegação principal">
        <NavLink to="/projeto">O projeto</NavLink>
        <NavLink to="/corrida">A corrida</NavLink>
        <NavLink to="/causa">Nossa causa</NavLink>
        <Link to="/suporte">Central de Suporte</Link>
      </nav>

      <a
        className="button button-header"
        href={LINK_INSCRICAO}
        target="_blank"
        rel="noopener noreferrer"
      >
        Inscreva-se <span>↗</span>
      </a>
    </header>
  );
}

function Rodape() {
  return (
    <footer className="footer">
      <Link className="footer-brand" to="/">
        <img src="/logo-fada.jpeg" alt="Fadas Extraordinárias" />
      </Link>

      <p>Solidariedade em movimento. Cada passo importa.</p>

      <div className="footer-links">
        <Link to="/projeto">O projeto</Link>
        <Link to="/corrida">A corrida</Link>
        <Link to="/causa">Nossa causa</Link>
      </div>

      <Link className="back-top" to="/">
        Voltar ao início ↑
      </Link>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Cabecalho />

      <Routes>
        <Route path="/admin/suporte" element={<AdminSuporte />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/corrida" element={<Corrida />} />
        <Route path="/causa" element={<Causa />} />
        <Route path="*" element={<Inicio />} />
      </Routes>

      <Rodape />
    </BrowserRouter>
  );
}

export default App;
