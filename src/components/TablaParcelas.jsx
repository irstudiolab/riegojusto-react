export function TablaParcelas({ parcelas, idEnEdicion, onEditar, onEliminar }) {
  if (!parcelas || parcelas.length === 0) return null;
  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <caption>Parcelas registradas</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Productor</th>
            <th scope="col">Extensión</th>
            <th scope="col">Cultivo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {parcelas.map((p) => (
            <tr key={p.id} className={p.id === idEnEdicion ? 'fila--activa' : undefined}>
              <td>{p.id}</td>
              <td>{p.productor}</td>
              <td>{p.extension}</td>
              <td>{p.cultivo}</td>
              <td className="tabla__acciones">
                <button
                  type="button"
                  className="boton boton--chico"
                  onClick={() => onEditar(p)}
                  aria-label={`Editar parcela de ${p.productor}`}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="boton boton--chico boton--peligro"
                  onClick={() => onEliminar(p)}
                  aria-label={`Eliminar parcela de ${p.productor}`}
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
