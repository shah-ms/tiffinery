const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const conn = require("../db/db");

router.post("/cart", async (req, res) => {
  //   const token = event.headers["Authorization"].replace("Bearer ", "");
  //   const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  //   const userId = payload["userId"];
  const { tiffinId, quantity } = req.body;
  console.log(tiffinId, quantity);

  var sql = "SELECT cartId FROM cart WHERE userId=?";
  conn.query(sql, 1, (err, result) => {
    if (err) {
    } else {
      if (result.length == 1) {
        let cartId = result[0]["cartId"];

        if (quantity == 1) {
          console.log("Increase quantity");
          var sql =
            "UPDATE cartItems SET quantity = quantity + 1 WHERE cartId=? AND tiffinId=?";
          conn.query(sql, [cartId, tiffinId], async (err, result) => {
            if (err) {
            } else {
              console.log(result);
              var sql =
                "SELECT * FROM cartItems INNER JOIN tiffins ON cartItems.tiffinId = tiffins.tiffinId WHERE cartItems.cartId=?";
              conn.query(sql, cartId, (err, result) => {
                if (!err) {
                  res.status(200).json(result);
                }
              });
            }
          });
        } else {
          console.log("cart quantity decrease");
          var sql =
            "SELECT cartItems.quantity FROM cartItems WHERE cartId=? AND tiffinId=?";
          conn.query(sql, [cartId, tiffinId], (err, result) => {
            if (!err) {
              console.log(result);
              if (result[0]["quantity"] == 1) {
                console.log("remove items");
                var sql = "DELETE FROM cartItems WHERE cartId=? AND tiffinId=?";
                conn.query(sql, [cartId, tiffinId], async (err, result) => {
                  if (!err) {
                    var sql =
                      "SELECT * FROM cartItems INNER JOIN tiffins ON cartItems.tiffinId = tiffins.tiffinId WHERE cartItems.cartId=?";
                    conn.query(sql, cartId, (err, result) => {
                      if (!err) {
                        res.status(200).json(result);
                      }
                    });
                  }
                });
              } else {
                console.log("decrease");
                var sql =
                  "UPDATE cartItems SET quantity = quantity - 1 WHERE cartId=? AND tiffinId=?";
                conn.query(sql, [cartId, tiffinId], async (err, result) => {
                  if (err) {
                  } else {
                    var sql =
                      "SELECT * FROM cartItems INNER JOIN tiffins ON cartItems.tiffinId = tiffins.tiffinId WHERE cartItems.cartId=?";
                    conn.query(sql, cartId, (err, result) => {
                      if (!err) {
                        res.status(200).json(result);
                      }
                    });
                  }
                });
              }
            }
          });
        }
      } else {
      }
    }
  });
});

router.get("/getCart", async (req, res) => {
  try {
    var sql =
      "SELECT * FROM cartItems INNER JOIN cart ON cartItems.cartId = cart.cartId INNER JOIN tiffins ON cartItems.tiffinId = tiffins.tiffinId WHERE cart.userId=?";
    conn.query(sql, 1, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        if (result.length != 0) {
          res.status(200).json({ items: result, cartEmpty: false });
        } else {
          res.status(200).json({ cartEmpty: true });
        }
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/cart/add", async (req, res) => {
  try {
    const { tiffinId } = req.body;
    console.log("cart add");
    var sql = "SELECT cartId FROM cart WHERE userId=?";
    conn.query(sql, 1, (err, result) => {
      if (err) {
      } else {
        if (result.length == 1) {
          let cartId = result[0]["cartId"];
          var sql =
            "INSERT INTO cartItems (cartId, tiffinId, quantity) VALUES (?,?,?)";
          conn.query(sql, [cartId, tiffinId, 1], (err, result) => {
            if (err) {
              res.status(400).json(err);
            } else {
              var sql = "SELECT * FROM cartItems WHERE cartId=?";
              conn.query(sql, cartId, (err, result) => {
                if (err) {
                  res.status(400).json(err);
                } else {
                  res.status(200).json(result);
                }
              });
            }
          });
        }
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
