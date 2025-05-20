const {errorResponse} = require('../utils/response');
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "error internal del servidor";
    const error = err.error || {};

    return errorResponse(res, errordata, message, statusCode);
};