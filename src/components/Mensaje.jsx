// Los errores se anuncian con role="alert" (interrumpe al lector de pantalla);
// el resto con role="status" (lo anuncia sin interrumpir).
export function Mensaje({ tipo, texto }) {
  if (!texto) return null;
  const rol = tipo === 'error' ? 'alert' : 'status';
  return (
    <div className={`mensaje mensaje--${tipo}`} role={rol}>
      {texto}
    </div>
  );
}
