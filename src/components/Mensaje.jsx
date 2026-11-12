export function Mensaje({ tipo, texto }) {
  if (!texto) return null;
  const estilos = {
    carga: { backgroundColor: '#e0f2fe', color: '#0369a1', border: '1px solid #7dd3fc' },
    error: { backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #f87171' },
    vacio: { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' }
  };
  return <div style={{ padding: '15px', margin: '20px 0', borderRadius: '8px', fontWeight: 'bold', ...estilos[tipo] }} role="alert">{texto}</div>;
}