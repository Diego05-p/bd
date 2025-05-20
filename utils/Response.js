const success = (res, data = {}, message = "operacion exitosa" = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
const errorResponse = (res, error ={},message = "error en loa operacion",statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error,
    });
}
module.exports = {
    successResponse,
    errorResponse
}