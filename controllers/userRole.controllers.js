const UserRole = require("../models/userRole.models");
const User = require("../models/user.models");
const Role = require("../models/role.models");
const response = require("../res/red/response");

const getAll = async (req, res, next) => {
  try {
    const userRoles = await UserRole.findAll({
      include: [
        { model: User, as: "User" },
        { model: Role, as: "Role" }
      ]
    });

    const data = userRoles.length > 0
      ? { total_userRoles: userRoles.length, userRoles }
      : { message: "This table has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userRole = await UserRole.findOne({
      where: { id },
      include: [
        { model: User, as: "User" },
        { model: Role, as: "Role" }
      ]
    });

    const data = userRole
      ? { userRole }
      : { message: "This query has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;

    await UserRole.sync();
    const createdUserRole = await UserRole.create(data);

    const message = {
      msg: "Record was created successfully",
      userRoleID: createdUserRole.id
    };

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await UserRole.update(data, { where: { id } });

    const message = {
      msg: "Record was updated successfully",
      userRoleID: id
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;

    await UserRole.destroy({ where: { id } });

    const message = {
      msg: "Record was deleted successfully",
      userRoleID: id
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleted
};
f