import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { TurnosContext } from "../context/TurnosContext";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function CategoriaTurno() {
  const navigate = useNavigate();
  const { agregarTurno, categoria, setCita, cita, categoriasMenu,setCedula } =
    useContext(TurnosContext);
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    setOpciones(categoriasMenu);
  }, []);

  return (
    <div className="cedimec-container">
      <div className="cedimec-content">
        <h1 className="cedimec-title">CEDIMEC</h1>

        <div className="categoria-form">
          <p className="categoria-instruction">
            Escoja la categoría de su turno{" "}
            <span className="categoria-highlight">{categoria}</span>
          </p>

          <div className="select-container">
            <select
              className="categoria-select"
              name="categoria"
              id="categoria"
              defaultValue="NaN"
              onChange={(e) => {
                setCita(e.target.value);
              }}
            >
              <option value="NaN" disabled>
                Categoría
              </option>
              {opciones.map((op) => {
                if (op.categoria == "GEN" && categoria == "General") {
                  return (
                    <option key={op.id} value={op.valor}>
                      {op.nombre}
                    </option>
                  );
                }

                if (op.categoria == "PRI" && categoria != "General") {
                  return (
                    <option key={op.id} value={op.valor}>
                      {op.nombre}
                    </option>
                  );
                }
              })}
            </select>
          </div>

          <div className="button-container">
            <button
              className="confirm-button"
              onClick={() => {
                if (cita) {
                  agregarTurno();
                navigate("/tuTurno");
                 
                 setCedula("");
                }
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
