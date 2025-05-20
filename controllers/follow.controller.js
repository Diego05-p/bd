const Follow = require("../models/follow.models");
const response = require("../red/response");

const getAll = async (req, res, next) => {
  try {
    const follows = await Follow.findAll();
    response.success(req, res, { follows }, 200);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const follow = await Follow.create(req.body);
    response.success(req, res, { follow }, 201);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create };
