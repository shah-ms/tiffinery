const express = require("express");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Tiffin");
const router = express.Router();

router.post("/cart", async (req, res) => {
  //   const token = event.headers["Authorization"].replace("Bearer ", "");
  //   const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  //   const userId = payload["userId"];
  const { tiffinId } = req.body;

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
    tiffinId: tiffinId,
    quantity: 1,
    userId: 1,
  };

  let item = new Cart(data);

  item.save((err, result) => {
    console.log(result);
  });
});

module.exports = router;
