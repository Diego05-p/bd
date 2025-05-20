const {Sequelize} = require('sequelize');
const config = require("../config");
const sequelize = new Sequelize(
    config.Mysql.database,
    config.Mysql.user,
    config.Mysql.password,
    {
        host: config.Mysql.host,
        dialect: config.Mysql.dialect,
        port: config.Mysql.port,
    }
);
module.exports = sequelize;