const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../midlewares/error");

const secret = config.Jwt.secret;

function assignToken(data) {
  return jwt.sign(data, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

const checkToken = {
  confirmToken: function (req, id, type) {
    const decoded = decodeHeader(req);
    if (type === 0) {
      const isAdmin = decoded.role_id === "90a0f9f4-d670-486a-8cd4-f56cdcbf9cb0";
      const isOwner = decoded.dataValues?.id === id || decoded.id === id;

      if (!isOwner && !isAdmin) {
        throw error("You don't have privileges to do this operation", 401);
      }
    }
  },
};

function getToken(authorization) {
  if (!authorization) {
    throw error("No token provided", 401);
  }

  if (!authorization.startsWith("Bearer ")) {
    throw error("Invalid Format", 401);
  }

  return authorization.replace("Bearer ", "");
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verifyToken(token);
  req.user = decoded;
  return decoded;
}

module.exports = {
  assignToken,
  checkToken,
};
