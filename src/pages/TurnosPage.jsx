import React, { useState, useEffect } from "react";
import "../App.css";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { TurnosContext } from "../context/TurnosContext";
const TurnosPage = () => {
  const navigate = useNavigate(); // Hook para navegar
  const { turnos, editarTurno, prepararSiguiente, userLog } =
    useContext(TurnosContext);

  useEffect(() => {
    console.log(userLog);
    if (userLog != "recep") navigate("/");
  }, []);

  return (
    <div className="cedimec-container">
      <h1 className="cedimec-title">Lista de Turnos</h1>
      <table className="turnos-table">
        <thead>
          <tr>
            <th>Turno</th>
            <th>Categoría</th>
            <th>Nombre/Cédula</th>
            <th>Estado de Atención</th>
          </tr>
        </thead>
        <tbody>
          {turnos &&
            turnos.map((turno, index) => {
              if (turno.estadoAtendido == false && turno.atendiendo == true) {
                return (
                  <tr key={index} className="prioritariaFila">
                    <td>
                      {turno.cita}-{turno.numero}
                    </td>
                    <td>{turno.categoria}</td>
                    <td>{turno.cedula}</td>
                    <td>
                      {turno.atendiendo ? <>En proceso</> : <>En espera</>}
                    </td>
                  </tr>
                );
              }
            })}
          {turnos &&
            turnos.map((turno, index) => {
              if (turno.estadoAtendido == false && turno.atendiendo == false) {
                return (
                  <tr
                    key={index}
                    className={` ${
                      turno.categoria === "Prioritaria" ? "primeraFila" : ""
                    } ${index === 0 ? "prioritariaFila" : ""}`}
                  >
                    <td>
                      {turno.cita}-{turno.numero}
                    </td>
                    <td>{turno.categoria}</td>
                    <td>{turno.cedula}</td>
                    <td>
                      {turno.atendiendo ? <>En proceso</> : <>En espera</>}
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
      <button
        className="btts_pequeños"
        onClick={() => {
          if (turnos[0].atendiendo == true) {
            if (turnos[1]) prepararSiguiente(turnos[1].id, true);
            editarTurno(turnos[0].id, true);
          } else {
            prepararSiguiente(turnos[0].id, true);
            if (turnos[1]) editarTurno(turnos[1].id, true);
          }
        }}
      >
        Llamar Siguiente Turno
      </button>
    </div>
  );
};

export default TurnosPage;