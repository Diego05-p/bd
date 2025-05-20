function errores(err, req, res, next) {
  const estado = err.status || 500;
  const mensaje = err.message || "Error interno del servidor";
  res.status(estado).json({
    error: true,
    mensaje,
  });
}

function crearError(mensaje, status) {
  const err = new Error(mensaje);
  if (status) err.status = status;
  return err;
}

module.exports = errores;
module.exports.crearError = crearError;

