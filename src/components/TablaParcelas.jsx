export function TablaParcelas({ parcelas }) {
  if (!parcelas || parcelas.length === 0) return null;
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead style={{ backgroundColor: '#0B5FA5', color: 'white' }}>
        <tr>
          <th style={{ padding: '10px', border: '1px solid #ccc' }}>ID</th>
          <th style={{ padding: '10px', border: '1px solid #ccc' }}>Productor</th>
          <th style={{ padding: '10px', border: '1px solid #ccc' }}>Extensión</th>
          <th style={{ padding: '10px', border: '1px solid #ccc' }}>Cultivo</th>
        </tr>
      </thead>
      <tbody>
        {parcelas.map((p) => (
          <tr key={p.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px' }}>{p.id}</td>
            <td style={{ padding: '10px' }}>{p.productor}</td>
            <td style={{ padding: '10px' }}>{p.extension}</td>
            <td style={{ padding: '10px' }}>{p.cultivo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}