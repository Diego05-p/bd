const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const userController = require("../controllers/user.controller");

// Configuración para multer (subida de imágenes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users/avatar");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ruta: GET /api/users
router.get("/", userController.getAll);

// Ruta: GET /api/users/:id
router.get("/:id", userController.getOne);

// Ruta: POST /api/users
router.post("/", userController.create);

// Ruta: PUT /api/users/:id
router.put("/:id", userController.update);

// Ruta: DELETE /api/users/:id
router.delete("/:id", userController.deleted);

// Ruta: POST /api/users/avatar/:id
router.post("/avatar/:id", upload.single("avatar"), userController.uploadAvatar);

module.exports = router;
