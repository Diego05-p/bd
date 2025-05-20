const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Definir la carpeta destino
const uploadPath = "uploads/images/users/avatar";

// Crear carpeta si no existe
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de imagen no válido"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

module.exports = upload;
