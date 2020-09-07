const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const conn = require("../db/db");

router.post("/cart", async (req, res) => {
  //   const token = event.headers["Authorization"].replace("Bearer ", "");
  //   const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  //   const userId = payload["userId"];
  const { tiffin } = req.body;
  console.log(tiffin);

  var sql = "SELECT * FROM cart WHERE tiffinId=?";
  conn.query(sql, tiffin, (err, result) => {
    if (err) {
    } else {
      console.log(result);
    }
  });
});

module.exports = router;
