import React from "react";
import { useContext } from "react";
import { TurnosContext } from "../context/TurnosContext";
import "../App.css";
import { useNavigate } from "react-router-dom";

export const FinalTurno = () => {
  const { ultimoTurno } = useContext(TurnosContext);
  const navigate = useNavigate();
  return (
    <div className="cedimec-container">
      <div className="cedimec-content">
        <h1 className="cedimec-title">CEDIMEC</h1>

        <div className="turno-confirmacion">
          <p className="confirmacion-titulo">¡PERFECTO!</p>
          <p className="confirmacion-subtitulo">
            Este es tu turno correspondiente
          </p>

          <div className="turno-numero">
            {ultimoTurno.cita}-{ultimoTurno.numero}
          </div>

          <div className="button-container">
            <button
              className="confirm-button"
              onClick={() => {
                navigate("/");
              }}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
