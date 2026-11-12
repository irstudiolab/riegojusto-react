import { useState } from 'react';

export function FormularioParcela({ onAgregar }) {
  const [productor, setProductor] = useState('');
  const [extension, setExtension] = useState('');
  const [cultivo, setCultivo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productor || !extension || !cultivo) return alert("Complete todos los campos");
    onAgregar({ productor, extension: Number(extension), cultivo });
    setProductor(''); setExtension(''); setCultivo('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ width: '100%', margin: '0 0 10px 0', color: '#1e293b' }}>Registrar Nueva Parcela</h3>
      <input type="text" placeholder="Productor" value={productor} onChange={(e) => setProductor(e.target.value)} style={{ padding: '10px', flex: '1' }} />
      <input type="number" placeholder="Extensión" value={extension} onChange={(e) => setExtension(e.target.value)} style={{ padding: '10px', flex: '1' }} />
      <input type="text" placeholder="Cultivo" value={cultivo} onChange={(e) => setCultivo(e.target.value)} style={{ padding: '10px', flex: '1' }} />
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2E7D32', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
        Guardar
      </button>
    </form>
  );
}