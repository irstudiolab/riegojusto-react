// Capa de acceso a la API. Todo el consumo de fetch vive aquí,
// así los componentes no conocen URLs ni detalles de HTTP.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const URL_PARCELAS = `${BASE_URL}/api/parcelas`;
const URL_TURNOS = `${BASE_URL}/api/turnos`;

async function pedir(url, opciones) {
  let respuesta;
  try {
    respuesta = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...opciones,
    });
  } catch {
    // fetch solo falla por red: servidor apagado, CORS, sin conexión
    throw new Error('No se pudo conectar con el servidor. Verifique que la API esté encendida.');
  }

  // La API siempre responde JSON, tanto en éxito como en error
  const datos = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    throw new Error(datos.error || `Error del servidor (${respuesta.status})`);
  }
  return datos;
}

// ---------- Parcelas ----------
export const listarParcelas = () => pedir(URL_PARCELAS);

export const crearParcela = (parcela) =>
  pedir(URL_PARCELAS, { method: 'POST', body: JSON.stringify(parcela) });

export const actualizarParcela = (id, cambios) =>
  pedir(`${URL_PARCELAS}/${id}`, { method: 'PATCH', body: JSON.stringify(cambios) });

export const eliminarParcela = (id) =>
  pedir(`${URL_PARCELAS}/${id}`, { method: 'DELETE' });

// ---------- Turnos ----------
export const listarTurnos = () => pedir(URL_TURNOS);

export const crearTurno = (turno) =>
  pedir(URL_TURNOS, { method: 'POST', body: JSON.stringify(turno) });

export const actualizarTurno = (id, cambios) =>
  pedir(`${URL_TURNOS}/${id}`, { method: 'PATCH', body: JSON.stringify(cambios) });

export const eliminarTurno = (id) =>
  pedir(`${URL_TURNOS}/${id}`, { method: 'DELETE' });
