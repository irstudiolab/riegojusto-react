import { useState, useEffect } from 'react';
import { Mensaje } from './components/Mensaje';
import { TablaParcelas } from './components/TablaParcelas';
import { FormularioParcela } from './components/FormularioParcela';

function App() {
  const [parcelas, setParcelas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // --- NUEVO: Estados para la API Externa (Clima) ---
  const [clima, setClima] = useState(null);
  const [cargandoClima, setCargandoClima] = useState(true);

  const URL_API = 'http://localhost:3000/api/parcelas';

  // 1. Carga de la API Interna (Parcelas)
  useEffect(() => {
    fetch(URL_API)
      .then((res) => {
        if (!res.ok) throw new Error("Error al conectar con la API");
        return res.json();
      })
      .then((datos) => {
        setParcelas(datos);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // --- NUEVO: 2. Carga de la API Externa (Clima) ---
  useEffect(() => {
    // Coordenadas de Santiago de los Caballeros (Cibao Noroeste)
    const lat = 19.4517;
    const lon = -70.6970;
    const URL_CLIMA = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(URL_CLIMA)
      .then((res) => res.json())
      .then((data) => {
        setClima(data.current_weather);
        setCargandoClima(false);
      })
      .catch((err) => {
        console.error("Error al cargar clima", err);
        setCargandoClima(false);
      });
  }, []);

  const agregarParcela = (nueva) => {
    const nuevoId = parcelas.length > 0 ? Math.max(...parcelas.map(p => p.id)) + 1 : 1;
    setParcelas([...parcelas, { ...nueva, id: nuevoId }]);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#0B5FA5' }}>🌱 RiegoJusto - Parcelas</h1>

      {/* --- NUEVO: Interfaz del Clima --- */}
      <div style={{ backgroundColor: '#e0f2fe', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', border: '1px solid #7dd3fc' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0369a1' }}>🌦️ Clima en el Cibao Noroeste</h3>
        {cargandoClima ? (
          <p>Cargando clima...</p>
        ) : clima ? (
          <p style={{ fontSize: '1.2rem', margin: 0 }}>
            Temperatura: <strong>{clima.temperature}°C</strong> | Viento: <strong>{clima.windspeed} km/h</strong>
          </p>
        ) : (
          <p>No se pudo cargar el clima.</p>
        )}
      </div>
      {/* ---------------------------------- */}

      <FormularioParcela onAgregar={agregarParcela} />

      {cargando && <Mensaje tipo="carga" texto="Cargando parcelas..." />}
      {error && <Mensaje tipo="error" texto={error} />}
      {!cargando && !error && parcelas.length === 0 && <Mensaje tipo="vacio" texto="No hay parcelas." />}
      
      {!cargando && !error && <TablaParcelas parcelas={parcelas} />}
    </div>
  );
}

export default App;
