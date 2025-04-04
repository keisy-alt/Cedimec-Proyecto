import { useState } from "react";
import React from "react";
import { useContext } from "react";
import { TurnosContext } from "../context/TurnosContext";

import { useNavigate } from "react-router-dom";
import "../App.css";
export const GenerarTurno = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(null);
  const { cedula, setCedula, setCategoria } = useContext(TurnosContext);
  return (
    <div className="cedimec-container">
      <div className="cedimec-content">
        <h1 className="cedimec-title">CEDIMEC</h1>

        {valid == true ? (
          <div className="turno-options">
            <p className="turno-instruction">
              Ingrese el tipo de turno que requiera
            </p>
            <div className="cedimec-buttons">
              <button
                className="cedimec-button"
                onClick={() => {
                  setCategoria("General");
                  navigate("/categoriaTurno");
                }}
              >
                General
              </button>

              <button
                className="cedimec-button"
                onClick={() => {
                  setCategoria("Prioritaria");
                  navigate("/categoriaTurno");
                }}
              >
                Prioritaria
              </button>
            </div>
          </div>
        ) : (
          <div className="cedula-form">
            <p className="form-instruction">
              Por favor ingrese su número de C.C.
            </p>
            <div className="input-container">
              <input
                className="cedula-input"
                type="text"
                placeholder="Ingrese su Documento"
                value={cedula}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setCedula(value);
                  }
                }}
                maxLength={10}
              />
              {cedula.length > 0 && cedula.length < 10 && (
                <p className="error-text">
                  La cédula debe tener al menos 9 dígitos
                </p>
              )}
            </div>
            <div className="button-container">
              <button
                className="confirm-button"
                onClick={() => {
                  if (cedula.length > 9 && cedula.length < 11) {
                    setValid(true);
                  } else {
                    setValid(false);
                  }
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};