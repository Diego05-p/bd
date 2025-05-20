const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRole.controller");

// Ruta: GET /api/userRoles
router.get("/", userRoleController.getAll);

// Ruta: GET /api/userRoles/:id
router.get("/:id", userRoleController.getOne);

// Ruta: POST /api/userRoles
router.post("/", userRoleController.create);

// Ruta: PUT /api/userRoles/:id
router.put("/:id", userRoleController.update);

// Ruta: DELETE /api/userRoles/:id
router.delete("/:id", userRoleController.deleted);

module.exports = router;
