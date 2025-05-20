const Comment = require("../models/comment.models");
const response = require("../red/response");

const getAll = async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    response.success(req, res, { comments }, 200);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    response.success(req, res, { comment }, 201);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create };
