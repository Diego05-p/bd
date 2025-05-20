const Auth = require("../models/auth.models");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const response = require("../red/response");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const data = await Auth.findOne({ where: { email } });
    if (!data) throw new Error("User not found");
    const valid = await bcrypt.compare(password, data.password);
    if (!valid) throw new Error("Invalid password");
    const token = auth.assignToken({ id: data.id, email: data.email });
    response.success(req, res, { token }, 200);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { id, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await Auth.create({ id, email, password: hashed });
    response.success(req, res, { msg: "User created" }, 201);
  } catch (err) {
    next(err);
  }
};

module.exports = { login, create };
