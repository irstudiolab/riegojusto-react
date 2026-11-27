export const ESTADOS = ['pendiente', 'aprobado', 'completado', 'cancelado'];

export function TablaTurnos({ turnos, parcelas, onCambiarEstado, onEliminar }) {
  if (!turnos || turnos.length === 0) return null;

  // Para mostrar el nombre del productor en lugar del número de parcela
  const nombreParcela = (id) => {
    const p = parcelas.find((x) => x.id === id);
    return p ? `${p.productor} — ${p.cultivo}` : `Parcela ${id}`;
  };

  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <caption>Turnos de riego</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Parcela</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{nombreParcela(t.parcelaId)}</td>
              <td>{t.fecha}</td>
              <td>
                <label htmlFor={`estado-${t.id}`} className="solo-lectores">
                  Estado del turno {t.id}
                </label>
                <select
                  id={`estado-${t.id}`}
                  className={`estado estado--${t.estado}`}
                  value={t.estado}
                  onChange={(e) => onCambiarEstado(t, e.target.value)}
                >
                  {ESTADOS.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </td>
              <td className="tabla__acciones">
                <button
                  type="button"
                  className="boton boton--chico boton--peligro"
                  onClick={() => onEliminar(t)}
                  aria-label={`Eliminar turno ${t.id}`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
