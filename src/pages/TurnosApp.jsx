import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function TurnosApp() {
  const [turnos, setTurnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [hora, setHora] = useState("");
  const [editing, setEditing] = useState(null);

  const turnosCollection = collection(db, "turnos");

  useEffect(() => {
    const unsubscribe = onSnapshot(turnosCollection, (snapshot) => {
      setTurnos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, []);

  const handleAddTurno = async () => {
    if (!nombre || !hora) return;
    await addDoc(turnosCollection, { nombre, hora });
    setNombre("");
    setHora("");
  };

  const handleEditTurno = async (id) => {
    const turnoDoc = doc(db, "turnos", id);
    await updateDoc(turnoDoc, { nombre, hora });
    setEditing(null);
    setNombre("");
    setHora("");
  };

  const handleDeleteTurno = async (id) => {
    const turnoDoc = doc(db, "turnos", id);
    await deleteDoc(turnoDoc);
  };

  return (
    <div className="p-4 ">
      <h2 className="text-xl font-bold mb-4">Gestión de Turnos</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        className="border p-2 mr-2"
      />
      {editing ? (
        <button
          onClick={() => handleEditTurno(editing)}
          className="bg-blue-500 text-white p-2"
        >
          Editar
        </button>
      ) : (
        <button
          onClick={handleAddTurno}
          className="bg-green-500 text-white p-2"
        >
          Agregar
        </button>
      )}
      <ul className="mt-4">
        {turnos.map((turno) => (
          <li
            key={turno.id}
            className="flex justify-between items-center border p-2"
          >
            {turno.nombre} - {turno.hora}
            <div>
              <button
                onClick={() => {
                  setEditing(turno.id);
                  setNombre(turno.nombre);
                  setHora(turno.hora);
                }}
                className="bg-yellow-500 text-white p-2 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteTurno(turno.id)}
                className="bg-red-500 text-white p-2"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
