import { useState, useEffect } from "react";
import "../lista-turnos.css";
import { useContext } from "react";

import { TurnosContext } from "../context/TurnosContext";
export default function VistaTurnos() {
  const { turnos } = useContext(TurnosContext);
  const [turnoActual, setTurnoActual] = useState("XXX-000");
  const [proximosTurnos, setProximosTurnos] = useState([]);
  useEffect(() => {
    setProximosTurnos(turnos);
  }, [turnos]);
  useEffect(() => {
    if (proximosTurnos.length > 0) {
      proximosTurnos.map((turno, index) => {
        if (turno.estadoAtendido == false && turno.atendiendo == true) {
          setTurnoActual(turno.cita + "-" + turno.numero);
        }
      });
    } else {
      setTurnoActual("XXX-000");
    }
  }, [proximosTurnos]);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="title">Lista de Turnos</h1>
        <button className="back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
        </button>
      </header>

      <div className="content">
        {/* Turno Actual */}
        <div className="turno-actual-container">
          <h2 className="section-title">Turno Actual</h2>
          <div className="turno-actual-display">
            <div className="turno-actual-text">{turnoActual}</div>
          </div>
        </div>

        {/* Próximo Turno */}
        <div className="proximo-turno-container">
          <h2 className="section-title proximo-title">Proximo Turno</h2>
          <div className="table-container">
            <table className="turnos-table">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Cedula</th>
                </tr>
              </thead>
              <tbody>
                {proximosTurnos.map((turno, index) => {
                  if (
                    turno.estadoAtendido == false &&
                    turno.atendiendo == true
                  ) {
                    return (
                      <tr
                        key={index}
                        className={
                          turno.categoria == "Prioritario" ? "highlighted-row" : ""
                        }
                      >
                        <td>
                          {turno.cita}-{turno.numero}
                        </td>
                        <td>{turno.cedula}</td>
                      </tr>
                    );
                  }
                })}
                {proximosTurnos.map((turno, index) => {
                  if (
                    turno.estadoAtendido == false &&
                    turno.atendiendo == false
                  ) {
                    return (
                      <tr
                        key={index}
                        className={
                          turno.categoria == "Prioritaria" ? "highlighted-row" : ""
                        }
                      >
                        <td>
                          {turno.cita}-{turno.numero}
                        </td>
                        <td>{turno.cedula}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
