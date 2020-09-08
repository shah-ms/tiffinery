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

  var sql = "SELECT cartId FROM cart WHERE userId=?";
  conn.query(sql, 1, (err, result) => {
    if (err) {
    } else {
      if (result.length() == 0) {
        var sql = "INSERT INTO cart (userId) VALUES (?)";
        conn.query(sql, 1, (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            console.log(result);
          }
        });
      } else {
      }
    }
  });
});

module.exports = router;
