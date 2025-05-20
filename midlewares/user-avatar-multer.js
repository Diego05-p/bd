const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/images/users/avatar",
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
