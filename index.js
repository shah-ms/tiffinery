const express = require("express");
const port = 5000;
const router = require("./router/user");
const bodyParser = require('body-parser');
const app = express();
const hostname = "172.19.0.1";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(router);

app.listen(port,() => {
  console.log(`Server running on port : ${port}`);
});
