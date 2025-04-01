import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { TurnosContext } from "../context/TurnosContext";
import "../App.css";

const AdminPanel = () => {
  const {
    categoriasMenu,
    agregarCategoria,
    editarCategoria,
    eliminarCategorias,
    promedioTIempo,
    turnosxDias,
  } = useContext(TurnosContext);
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [id, setId] = useState();
  const [categoria, setCategoria] = useState("");
  const [opcion, setOpcion] = useState(0);

  return (
    <div className="cedimec-container">
      <h1 className="cedimec-title">Admin</h1>
      <div className="admin-section">
        <div className="turno-table">
          <h2 className="ttls_grandes">Prioritarios</h2>
          <table className="tablaCategorias">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoriasMenu.map((cat, index) => {
                if (cat.categoria == "PRI") {
                  return (
                    <tr key={index}>
                      <td>{cat.valor}</td>
                      <td>{cat.nombre}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => {
                            setCategoria("PRI");
                            setCodigo(cat.valor);
                            setNombre(cat.nombre);
                            setId(cat.id);
                            setOpcion(1);
                            setShowModal(true);
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => {
                            eliminarCategorias(cat.id);
                          }}
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
              <tr>
                <td colSpan={3}>
                  <button
                    className="btts_pequeños"
                    onClick={() => {
                      setCategoria("PRI");
                      setShowModal(true);
                    }}
                  >
                    + Añadir categoria
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="turno-table">
          <h2 className="ttls_grandes">General</h2>
          <table className="tablaCategorias">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoriasMenu.map((cat, index) => {
                if (cat.categoria == "GEN") {
                  return (
                    <tr key={index}>
                      <td>{cat.valor}</td>
                      <td>{cat.nombre}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => {
                            setCategoria("GEN");
                            setCodigo(cat.valor);
                            setNombre(cat.nombre);
                            setOpcion(1);
                            setId(cat.id);
                            setShowModal(true);
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => {
                            eliminarCategorias(cat.id);
                          }}
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
              <tr>
                <td colSpan={3}>
                  <button
                    className="btts_pequeños"
                    onClick={() => {
                      setCategoria("GEN");
                      setShowModal(true);
                    }}
                  >
                    + Añadir categoria
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-item">
          <h3>Media de tiempo espera</h3>
          <p>
            {Math.round(promedioTIempo)}
            {" Minutos"}
          </p>
        </div>
        <div className="stat-item">
          <h3>Número de turnos (Día)</h3>
          <p> {turnosxDias}</p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Agregar Categoria</h2>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                  <label htmlFor="username">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Codigo:</label>
                  <input
                    type="text"
                    id="valor"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button
                    onClick={() => {
                      if (opcion == 0) {
                        if (categoria && nombre) {
                          agregarCategoria(categoria, nombre, codigo);
                          setNombre("");
                          setCodigo("");
                          setShowModal(false);
                        }
                      }
                      if (opcion == 1) {
                        if (categoria && nombre) {
                          editarCategoria(id, {
                            categoria,
                            nombre,
                            valor: codigo,
                          });
                          setNombre("");
                          setCodigo("");
                          setOpcion(0);
                          setShowModal(false);
                        }
                      }
                    }}
                    className="login-button"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
