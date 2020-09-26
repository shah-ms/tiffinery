const mysql = require("mysql");
require("dotenv").config();

var conn = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = conn;
