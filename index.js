//const app = require("./app/app");
const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto",3000);
});
