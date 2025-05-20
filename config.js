require("dotenv").config();  
module.exports = {
  app: {
  PORT: process.env.PORT || 3000,
  },
  Jwt: {
    secret: process.env.JWT_SECRET || "palabra clave",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
  Mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DB || "parcial2",
    PORT: process.env.MYSQL_PORT || 3306,
    dialect: process.env.MYSQL_DIALECT || "mysql",
  }
}