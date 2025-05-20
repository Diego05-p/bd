const Role = require("../models/role.models"); // Asegúrate de que el nombre del archivo sea correcto
const response = require("../res/red/response");

const getAll = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    let data = roles.length > 0
      ? { total_roles: roles.length, roles }
      : { message: "This table has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await Role.findOne({ where: { id } });
    const data = role
      ? { role }
      : { message: "This query has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await Role.sync(); // Opcional: asegúrate de sincronizar solo si necesario
    const createRole = await Role.create(data);

    const message = {
      msg: "Record was created successfully",
      roleID: createRole.id,
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

    await Role.update(data, { where: { id } });

    const message = {
      msg: "Record was updated successfully",
      roleID: id,
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Role.destroy({ where: { id } });

    const message = {
      msg: "Record was deleted successfully",
      roleID: id,
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
  deleted,
};
