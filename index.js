const express = require("express");
const UserRouter = require("./router/user");
const TiffinRouter = require("./router/tiffin");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./db/db");

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(UserRouter);
app.use(TiffinRouter);

let port = process.env.PORT;

if (port == null || port == "") {
  port = 5000;
}

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
