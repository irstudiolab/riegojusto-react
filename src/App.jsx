import { useState, useEffect } from 'react';
import { Mensaje } from './components/Mensaje';
import { TablaParcelas } from './components/TablaParcelas';
import { FormularioParcela } from './components/FormularioParcela';
import { TablaTurnos } from './components/TablaTurnos';
import { FormularioTurno } from './components/FormularioTurno';
import {
  listarParcelas,
  crearParcela,
  actualizarParcela,
  eliminarParcela,
  listarTurnos,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
} from './api';

function App() {
  const [vista, setVista] = useState('parcelas'); // 'parcelas' | 'turnos'
  const [parcelas, setParcelas] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);        // fallo al cargar los datos
  const [aviso, setAviso] = useState(null);         // resultado de una acción: { tipo, texto }
  const [guardando, setGuardando] = useState(false);
  const [enEdicion, setEnEdicion] = useState(null); // parcela que se está editando, o null

  useEffect(() => {
    Promise.all([listarParcelas(), listarTurnos()])
      .then(([listaParcelas, listaTurnos]) => {
        setParcelas(listaParcelas);
        setTurnos(listaTurnos);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const cambiarVista = (nueva) => {
    setVista(nueva);
    setAviso(null);
  };

  // ---------- Parcelas ----------
  // Usuario → React → API → respuesta → actualización de la interfaz
  const guardarParcela = async (datos) => {
    setGuardando(true);
    setAviso(null);
    try {
      if (enEdicion) {
        const { datos: actualizada } = await actualizarParcela(enEdicion.id, datos);
        setParcelas((prev) => prev.map((p) => (p.id === actualizada.id ? actualizada : p)));
        setEnEdicion(null);
        setAviso({ tipo: 'exito', texto: 'Parcela actualizada.' });
      } else {
        const { datos: creada } = await crearParcela(datos);
        setParcelas((prev) => [...prev, creada]);
        setAviso({ tipo: 'exito', texto: 'Parcela registrada.' });
      }
      return true; // el formulario se limpia solo si la API aceptó los datos
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const borrarParcela = async (parcela) => {
    if (!window.confirm(`¿Eliminar la parcela de ${parcela.productor}? También se eliminarán sus turnos.`)) return;
    setAviso(null);
    try {
      await eliminarParcela(parcela.id);
      setParcelas((prev) => prev.filter((p) => p.id !== parcela.id));
      // La API elimina en cascada los turnos de la parcela; la interfaz hace lo mismo
      setTurnos((prev) => prev.filter((t) => t.parcelaId !== parcela.id));
      if (enEdicion?.id === parcela.id) setEnEdicion(null);
      setAviso({ tipo: 'exito', texto: 'Parcela eliminada.' });
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
    }
  };

  // ---------- Turnos ----------
  const guardarTurno = async (datos) => {
    setGuardando(true);
    setAviso(null);
    try {
      const { datos: creado } = await crearTurno(datos);
      setTurnos((prev) => [...prev, creado]);
      setAviso({ tipo: 'exito', texto: 'Turno asignado.' });
      return true;
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const cambiarEstadoTurno = async (turno, estado) => {
    setAviso(null);
    try {
      const { datos: actualizado } = await actualizarTurno(turno.id, { estado });
      setTurnos((prev) => prev.map((t) => (t.id === actualizado.id ? actualizado : t)));
      setAviso({ tipo: 'exito', texto: `Turno ${turno.id} marcado como ${estado}.` });
    } catch (err) {
      // El estado en pantalla no cambia, porque solo se actualiza con la respuesta de la API
      setAviso({ tipo: 'error', texto: err.message });
    }
  };

  const borrarTurno = async (turno) => {
    if (!window.confirm(`¿Eliminar el turno ${turno.id}?`)) return;
    setAviso(null);
    try {
      await eliminarTurno(turno.id);
      setTurnos((prev) => prev.filter((t) => t.id !== turno.id));
      setAviso({ tipo: 'exito', texto: 'Turno eliminado.' });
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
    }
  };

  return (
    <>
      <header className="encabezado">
        <h1>RiegoJusto</h1>
        <p>Distribución transparente del agua de riego</p>
      </header>

      <nav className="navegacion" aria-label="Secciones">
        <button
          type="button"
          className="navegacion__boton"
          aria-current={vista === 'parcelas' ? 'page' : undefined}
          onClick={() => cambiarVista('parcelas')}
        >
          Parcelas
        </button>
        <button
          type="button"
          className="navegacion__boton"
          aria-current={vista === 'turnos' ? 'page' : undefined}
          onClick={() => cambiarVista('turnos')}
        >
          Turnos
        </button>
      </nav>

      <main className="contenedor">
        {vista === 'parcelas' && (
          <FormularioParcela
            parcelaEnEdicion={enEdicion}
            guardando={guardando}
            onGuardar={guardarParcela}
            onCancelar={() => setEnEdicion(null)}
          />
        )}
        {vista === 'turnos' && !cargando && !error && (
          <FormularioTurno parcelas={parcelas} guardando={guardando} onGuardar={guardarTurno} />
        )}

        {aviso && <Mensaje tipo={aviso.tipo} texto={aviso.texto} />}
        {cargando && <Mensaje tipo="carga" texto="Cargando datos..." />}
        {error && <Mensaje tipo="error" texto={error} />}

        {vista === 'parcelas' && !cargando && !error && (
          <>
            {parcelas.length === 0 && (
              <Mensaje tipo="vacio" texto="Aún no hay parcelas. Registre la primera con el formulario." />
            )}
            <TablaParcelas
              parcelas={parcelas}
              idEnEdicion={enEdicion?.id}
              onEditar={setEnEdicion}
              onEliminar={borrarParcela}
            />
          </>
        )}

        {vista === 'turnos' && !cargando && !error && (
          <>
            {turnos.length === 0 && (
              <Mensaje tipo="vacio" texto="Aún no hay turnos. Asigne el primero con el formulario." />
            )}
            <TablaTurnos
              turnos={turnos}
              parcelas={parcelas}
              onCambiarEstado={cambiarEstadoTurno}
              onEliminar={borrarTurno}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
