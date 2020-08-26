const express = require("express");
const UserRouter = require("./router/users");
const TiffinRouter = require("./router/tiffins");
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

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
