const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const conn = require("../db/db");

function getCartItems(cartId) {
  var sql =
    "SELECT * FROM cartItems INNER JOIN tiffins ON cartItems.tiffinId = tiffins.tiffinId WHERE cartItems.cartId=?";
  conn.query(sql, cartId, (err, result) => {
    if (!err) {
      return result;
    }
  });
}

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
              let cartItems = await getCartItems(cartId);
              console.log(cartItems);
              res.status(200).json(cartItems);
            }
          });
        } else {
          var sql =
            "SELECT cartItems.quantity FROM cartItems WHERE cartId=? AND tiffinId=?";
          conn.query(sql, [cartId, tiffinId], (err, result) => {
            if (!err) {
              if (result["quantity"] == 1) {
                var sql = "DELETE FROM cartItems WHERE cartId=? AND tiffinId=?";
                conn.query(sql, [cartId, tiffinId], async (err, result) => {
                  if (!err) {
                    let cartItems = await getCartItems(cartId);
                    res.status(200).json(cartItems);
                  }
                });
              } else {
                var sql =
                  "UPDATE cartItems SET quantity = quantity - 1 WHERE cartId=? AND tiffinId=?";
                conn.query(sql, [cartId, tiffinId], async (err, result) => {
                  if (err) {
                  } else {
                    let cartItems = await getCartItems(cartId);
                    res.status(200).json(cartItems);
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

module.exports = router;
