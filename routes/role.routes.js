const express = require("express");
const router = express.Router();

const controller = require("../controllers/role.controller");

// Obtener todos los roles
router.get("/", controller.getAll);

// Obtener un solo rol por ID
router.get("/:id", controller.getOne);

// Crear un nuevo rol
router.post("/", controller.create);

// Actualizar un rol existente por ID
router.put("/:id", controller.update);

// Eliminar un rol por ID
router.delete("/:id", controller.deleted);

module.exports = router;
