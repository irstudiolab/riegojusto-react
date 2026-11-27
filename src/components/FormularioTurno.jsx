import { useState } from 'react';

// Fecha de hoy en formato YYYY-MM-DD usando la hora local (no UTC)
function hoy() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export function FormularioTurno({ parcelas, guardando, onGuardar }) {
  const [parcelaId, setParcelaId] = useState('');
  const [fecha, setFecha] = useState('');
  const [errores, setErrores] = useState({});

  if (parcelas.length === 0) {
    return (
      <section className="formulario">
        <h2>Asignar nuevo turno</h2>
        <p>Primero registre al menos una parcela en la pestaña «Parcelas».</p>
      </section>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encontrados = {};
    if (!parcelaId) encontrados.parcelaId = 'Seleccione una parcela.';
    if (!fecha) encontrados.fecha = 'Seleccione la fecha del turno.';
    else if (fecha < hoy()) encontrados.fecha = 'La fecha no puede ser anterior a hoy.';
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const guardado = await onGuardar({ parcelaId: Number(parcelaId), fecha });
    if (guardado) {
      setParcelaId('');
      setFecha('');
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <h2>Asignar nuevo turno</h2>
      <div className="formulario__campos formulario__campos--dos">
        <div className="campo">
          <label htmlFor="parcelaId">Parcela</label>
          <select
            id="parcelaId"
            value={parcelaId}
            onChange={(e) => setParcelaId(e.target.value)}
            aria-invalid={errores.parcelaId ? 'true' : undefined}
            aria-describedby={errores.parcelaId ? 'parcelaId-error' : undefined}
          >
            <option value="">Seleccione una parcela</option>
            {parcelas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.productor} — {p.cultivo} ({p.extension})
              </option>
            ))}
          </select>
          {errores.parcelaId && (
            <span id="parcelaId-error" className="campo__error">{errores.parcelaId}</span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="fecha">Fecha del turno</label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            min={hoy()}
            onChange={(e) => setFecha(e.target.value)}
            aria-invalid={errores.fecha ? 'true' : undefined}
            aria-describedby={errores.fecha ? 'fecha-error' : undefined}
          />
          {errores.fecha && (
            <span id="fecha-error" className="campo__error">{errores.fecha}</span>
          )}
        </div>
      </div>
      <div className="formulario__acciones">
        <button type="submit" className="boton boton--primario" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Asignar turno'}
        </button>
      </div>
    </form>
  );
}
