const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const conn = require("../db/db");

router.post("/cart", async (req, res) => {
  //   const token = event.headers["Authorization"].replace("Bearer ", "");
  //   const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  //   const userId = payload["userId"];
  const { tiffin, quantity } = req.body;
  console.log(tiffin);

  var sql = "SELECT cartId FROM cart WHERE userId=?";
  conn.query(sql, 1, (err, result) => {
    if (err) {
    } else {
      console.log(result, "New Cart");
      if (result.length == 0) {
        var sql = "INSERT INTO cart (userId) VALUES (?)";
        conn.query(sql, 1, (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            let cartId = result["insertId"];
            var sql =
              "INSERT INTO cartItems (cartId, tiffinId, quantity) VALUES (?)";
            conn.query(sql, [cartId, tiffin, quantity], (err, result) => {
              if (err) {
                res.status(400).json(err);
              } else {
                res.status(200);
              }
            });
          }
        });
      } else {
        console.log(result, "Existing cart");
        let cartId = result["cartId"];
        var sql =
          "INSERT INTO cartItems (cartId, tiffinId, quantity) VALUES (?, ?, ?)";
        conn.query(sql, [cartId, tiffin, quantity], (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200);
          }
        });
      }
    }
  });
});

module.exports = router;
