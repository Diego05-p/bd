// src/app/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");

const errorHandler = require("../middlewares/errors");
const responseHandler = require("../res/red/response"); 

const authRoutes = require("../auth/index");
const roleRoutes = require("../routes/role.routes");
const userRoutes = require("../routes/user.routes");
const userRoleRoutes = require("../routes/userRole.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images/users/avatar", express.static(path.join(__dirname, "../../uploads/users/avatar")));

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user-roles", userRoleRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

app.use(errorHandler);

module.exports = app;
