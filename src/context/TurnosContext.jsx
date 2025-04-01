import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  where,
} from "firebase/firestore";

// 1 Crear el contexto
export const TurnosContext = createContext();

// 2 Crear el proveedor del contexto
export function TurnosProvider({ children }) {
  const [turnos, setTurnos] = useState([]);
  const [ultimoTurno, setUltimoTurno] = useState(null);
  const [cedula, setCedula] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cita, setCita] = useState("");
  const [historialTurnos, sethistorialTurnos] = useState([]);
  const [categoriasMenu, setCategoriasMenu] = useState([]);

  const [promedioTIempo, setPromedioTIempo] = useState(0);
  const [turnosxDias, setTurnosxDias] = useState();

  const turnosCollection = collection(db, "turnos");
  const categoriaCollection = collection(db, "categorias");

  const contarTurnosHoy = (historialTurnos) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Eliminar horas, minutos y segundos

    return historialTurnos.filter((turno) => {
      if (!turno.hora) return false;
      const entrada = turno.hora.toDate();
      return entrada.toDateString() === hoy.toDateString();
    }).length;
  };
  const calcularPromedioSalida = (historialTurnos) => {
    if (!historialTurnos.length) return 0;

    const totalTiempo = historialTurnos.reduce((acc, turno) => {
      if (turno.hora && turno.horaSalida) {
        const entrada = turno.hora.toDate(); // Convertir a Date
        const salida = turno.horaSalida.toDate(); // Convertir a Date
        return acc + (salida - entrada); // Diferencia en milisegundos
      }
      return acc;
    }, 0);

    return totalTiempo / historialTurnos.length / (1000 * 60); // Promedio en minutos
  };

  useEffect(() => {
    const q = query(
      turnosCollection,
      orderBy("categoria", "desc"),
      orderBy("numero", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const turnosData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      sethistorialTurnos(turnosData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    var promedio = calcularPromedioSalida(historialTurnos);
    var contTurnos = contarTurnosHoy(historialTurnos);
    setPromedioTIempo(promedio);
    setTurnosxDias(contTurnos);
  }, [historialTurnos]);

  useEffect(() => {
    const q = query(
      turnosCollection,
      where("estadoAtendido", "==", false),
      orderBy("categoria", "desc"),
      orderBy("numero", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const turnosData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(turnosData);
      setTurnos(turnosData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(categoriaCollection, (snapshot) => {
      const categoriaData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategoriasMenu(categoriaData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(turnosCollection, orderBy("hora", "desc"), limit(1));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUltimoTurno(snapshot.docs[0]?.data() || null);
    });
    return () => unsubscribe();
  }, []);

  const agregarCategoria = async (categoria, nombre, valor) => {
    await addDoc(categoriaCollection, {
      categoria,
      nombre,
      valor,
    });
  };
  const editarCategoria = async (id, data) => {
    const catDoc = doc(db, "categorias", id);
    await updateDoc(catDoc, data);
  };

  const agregarTurno = async (estadoAtendido = false) => {
    var numero = 0;
    if (!cedula || !categoria || !cita) return;
    numero = 0;
    if (ultimoTurno) {
      numero = ultimoTurno.numero + 1;
    }
    var atendiendo = false;
    await addDoc(turnosCollection, {
      cedula,
      categoria,
      numero,
      hora: serverTimestamp(),
      atendiendo,
      estadoAtendido,
      cita,
      horaSalida: null,
    });
  };
  const prepararSiguiente = async (id, data) => {
    const turnoDoc = doc(db, "turnos", id);
    await updateDoc(turnoDoc, {
      atendiendo: data,
      horaSalida: serverTimestamp(),
    });
  };
  const editarTurno = async (id, data) => {
    const turnoDoc = doc(db, "turnos", id);
    await updateDoc(turnoDoc, {
      estadoAtendido: data,
      horaSalida: serverTimestamp(),
    });
  };
  const eliminarCategorias = async (id) => {
    const catDoc = doc(db, "categorias", id);
    await deleteDoc(catDoc);
  };
  const eliminarTurno = async (id) => {
    const turnoDoc = doc(db, "turnos", id);
    await deleteDoc(turnoDoc);
  };

  return (
    <TurnosContext.Provider
      value={{
        turnos,
        ultimoTurno,
        agregarTurno,
        editarTurno,
        eliminarTurno,
        setCategoria,
        categoria,
        cedula,
        setCedula,
        setCita,
        cita,
        categoriasMenu,
        prepararSiguiente,
        agregarCategoria,
        editarCategoria,
        eliminarCategorias,
        promedioTIempo,
        turnosxDias,
      }}
    >
      {children}
    </TurnosContext.Provider>
  );
}
