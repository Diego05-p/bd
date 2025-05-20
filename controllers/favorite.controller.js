const Favorite = require("../models/favorite.models");
const response = require("../red/response");

const getAll = async (req, res, next) => {
  try {
    const favorites = await Favorite.findAll();
    response.success(req, res, { favorites }, 200);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const favorite = await Favorite.create(req.body);
    response.success(req, res, { favorite }, 201);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create };
