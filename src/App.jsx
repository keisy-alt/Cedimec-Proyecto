import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { GenerarTurno } from "./pages/GenerarTurno";
import CategoriaTurno from "./pages/CategoriaTurno";

import { FinalTurno } from "./pages/FinalTurno";
import VistaTurnos from "./pages/VistaTurnos";
import TurnosPage from "./pages/TurnosPage";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/generarTurno" element={<GenerarTurno />} />
        <Route path="/categoriaTurno" element={<CategoriaTurno />} />
        <Route path="/tuTurno" element={<FinalTurno />} />

        <Route path="/VistaTurnos" element={<VistaTurnos />} />

        <Route path="/TurnosRep" element={<TurnosPage />} />

        <Route path="/AdminPanel" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
