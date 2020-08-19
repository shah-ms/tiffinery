const express = require("express");
const router = require("./router/user");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(router);

let port = process.env.PORT;

if(port == null || port == "") {
	port = 5000;
}

app.listen(port,() => {
  console.log(`Server running on port : ${port}`);
});
