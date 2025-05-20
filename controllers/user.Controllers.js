const User = require("../models/user.models");
const Role = require("../models/role.models");
const Auth = require("../models/auth.models");
const response = require("../res/red/response");
const bcrypt = require("bcrypt");
const fs = require("fs");

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: { model: Role, as: "Role" }
    });

    const data = users.length > 0
      ? { total_users: users.length, users }
      : { message: "This table has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id },
      include: { model: Role, as: "Role" }
    });

    const data = user
      ? { user }
      : { message: "This query has no records" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;

    await User.sync();
    const createdUser = await User.create(data);

    const message = {
      msg: "Record was created successfully",
      userID: createdUser.id
    };

    if (data.email && data.password) {
      await Auth.sync();
      const hashedPassword = await bcrypt.hash(data.password.toString(), 5);
      const createdAuth = await Auth.create({
        id: createdUser.id,
        email: data.email,
        password: hashedPassword
      });
      message.authID = createdAuth.id;
    }

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await User.update(data, { where: { id } });

    const message = {
      msg: "Record was updated successfully",
      userID: id
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;

    await User.destroy({ where: { id } });

    const message = {
      msg: "Record was deleted successfully",
      userID: id
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const { file } = req;
    const id = req.params.id;

    const imagePath = `http://localhost:3000/images/users/avatar/${file.filename}`;
    const filePath = file.path;

    const data = {
      avatar: imagePath,
      imagePath: filePath
    };

    const user = await User.findOne({ where: { id } });

    if (user && user.imagePath) {
      fs.unlink(user.imagePath, (err) => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    await User.update(data, { where: { id } });

    const message = {
      msg: "Image was modified successfully",
      userID: id,
      img: imagePath
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
  uploadAvatar
};
