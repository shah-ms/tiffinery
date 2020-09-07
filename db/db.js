// const mongoose = require("mongoose");
const mysql = require("mysql");
require("dotenv").config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//     });

//     console.log("MongoDB connected ...");
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

var conn = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = conn;
