import { useState, useEffect } from 'react';
import { Mensaje } from './components/Mensaje';
import { TablaParcelas } from './components/TablaParcelas';
import { FormularioParcela } from './components/FormularioParcela';
import {
  listarParcelas,
  crearParcela,
  actualizarParcela,
  eliminarParcela,
} from './api';

function App() {
  const [parcelas, setParcelas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);       // fallo al cargar la lista
  const [aviso, setAviso] = useState(null);        // resultado de crear/editar/eliminar: { tipo, texto }
  const [guardando, setGuardando] = useState(false);
  const [enEdicion, setEnEdicion] = useState(null); // parcela que se está editando, o null

  useEffect(() => {
    listarParcelas()
      .then(setParcelas)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

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
    if (!window.confirm(`¿Eliminar la parcela de ${parcela.productor}?`)) return;
    setAviso(null);
    try {
      await eliminarParcela(parcela.id);
      setParcelas((prev) => prev.filter((p) => p.id !== parcela.id));
      if (enEdicion?.id === parcela.id) setEnEdicion(null);
      setAviso({ tipo: 'exito', texto: 'Parcela eliminada.' });
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
    }
  };

  return (
    <>
      <header className="encabezado">
        <h1>RiegoJusto</h1>
        <p>Registro de parcelas de riego</p>
      </header>

      <main className="contenedor">
        <FormularioParcela
          parcelaEnEdicion={enEdicion}
          guardando={guardando}
          onGuardar={guardarParcela}
          onCancelar={() => setEnEdicion(null)}
        />

        {aviso && <Mensaje tipo={aviso.tipo} texto={aviso.texto} />}
        {cargando && <Mensaje tipo="carga" texto="Cargando parcelas..." />}
        {error && <Mensaje tipo="error" texto={error} />}
        {!cargando && !error && parcelas.length === 0 && (
          <Mensaje tipo="vacio" texto="Aún no hay parcelas. Registre la primera con el formulario." />
        )}

        {!cargando && !error && (
          <TablaParcelas
            parcelas={parcelas}
            idEnEdicion={enEdicion?.id}
            onEditar={setEnEdicion}
            onEliminar={borrarParcela}
          />
        )}
      </main>
    </>
  );
}

export default App;
