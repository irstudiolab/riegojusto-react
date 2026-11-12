import { useState, useEffect } from 'react';
import { Mensaje } from './components/Mensaje';
import { TablaParcelas } from './components/TablaParcelas';
import { FormularioParcela } from './components/FormularioParcela';

function App() {
  const [parcelas, setParcelas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const URL_API = 'http://localhost:3000/api/parcelas';

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

  const agregarParcela = (nueva) => {
    const nuevoId = parcelas.length > 0 ? Math.max(...parcelas.map(p => p.id)) + 1 : 1;
    setParcelas([...parcelas, { ...nueva, id: nuevoId }]);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#0B5FA5' }}>🌱 RiegoJusto - Parcelas</h1>
      
      <FormularioParcela onAgregar={agregarParcela} />

      {cargando && <Mensaje tipo="carga" texto="Cargando parcelas..." />}
      {error && <Mensaje tipo="error" texto={error} />}
      {!cargando && !error && parcelas.length === 0 && <Mensaje tipo="vacio" texto="No hay parcelas." />}
      
      {!cargando && !error && <TablaParcelas parcelas={parcelas} />}
    </div>
  );
}

export default App;