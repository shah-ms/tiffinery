const express = require("express");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Tiffin");
const router = express.Router();

router.post("/cart", async (req, res) => {
  //   const token = event.headers["Authorization"].replace("Bearer ", "");
  //   const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  //   const userId = payload["userId"];
  const { tiffin } = req.body;
  console.log(tiffin);
  //   const result = await Cart.findOneAndUpdate(
  //     {
  //       userId: userId,
  //       tiffinId: tiffinId,
  //     },
  //     { $inc: { quantity: 1 } },
  //     { returnNewDocument: true }
  //   ).exec();

  //   console.log(result);

  const data = {
    tiffin: tiffin,
    quantity: 1,
    userId: "1",
  };

  var item = new Cart(data);

  Cart.save(function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

module.exports = router;
