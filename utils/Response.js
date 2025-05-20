exports.success = (req, res, message = "", status = 200) => {
  res.status(status).json({
    error: false,
    status,
    body: message,
  });
};

exports.error = (req, res, message = "Internal Server Error", status = 500) => {
  res.status(status).json({
    error: true,
    status,
    body: message,
  });
};
