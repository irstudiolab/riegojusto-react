import { useState, useEffect } from 'react';

const VACIO = { productor: '', extension: '', cultivo: '' };

function validar({ productor, extension, cultivo }) {
  const errores = {};
  if (!productor.trim()) errores.productor = 'Escriba el nombre del productor.';
  if (extension === '' || Number(extension) <= 0) {
    errores.extension = 'La extensión debe ser un número mayor a 0.';
  }
  if (!cultivo.trim()) errores.cultivo = 'Escriba el cultivo.';
  return errores;
}

export function FormularioParcela({ parcelaEnEdicion, guardando, onGuardar, onCancelar }) {
  const [valores, setValores] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const editando = Boolean(parcelaEnEdicion);

  // Al pulsar "Editar" en la tabla, el formulario se llena con esa parcela
  useEffect(() => {
    setErrores({});
    setValores(
      parcelaEnEdicion
        ? {
            productor: parcelaEnEdicion.productor,
            extension: String(parcelaEnEdicion.extension),
            cultivo: parcelaEnEdicion.cultivo,
          }
        : VACIO
    );
  }, [parcelaEnEdicion]);

  const cambiar = (campo) => (e) => setValores({ ...valores, [campo]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encontrados = validar(valores);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const guardado = await onGuardar({
      productor: valores.productor.trim(),
      extension: Number(valores.extension),
      cultivo: valores.cultivo.trim(),
    });
    if (guardado && !editando) setValores(VACIO);
  };

  const campo = (id, etiqueta, tipo, extra = {}) => (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      <input
        id={id}
        type={tipo}
        value={valores[id]}
        onChange={cambiar(id)}
        aria-invalid={errores[id] ? 'true' : undefined}
        aria-describedby={errores[id] ? `${id}-error` : undefined}
        {...extra}
      />
      {errores[id] && (
        <span id={`${id}-error`} className="campo__error">
          {errores[id]}
        </span>
      )}
    </div>
  );

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <h2>{editando ? 'Editar parcela' : 'Registrar nueva parcela'}</h2>
      <div className="formulario__campos">
        {campo('productor', 'Productor', 'text', { autoComplete: 'name' })}
        {campo('extension', 'Extensión (tareas)', 'number', { min: '0', step: 'any', inputMode: 'decimal' })}
        {campo('cultivo', 'Cultivo', 'text')}
      </div>
      <div className="formulario__acciones">
        <button type="submit" className="boton boton--primario" disabled={guardando}>
          {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Registrar parcela'}
        </button>
        {editando && (
          <button type="button" className="boton" onClick={onCancelar} disabled={guardando}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
