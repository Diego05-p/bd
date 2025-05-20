class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indica que el error fue previsto
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  AppError,
};
