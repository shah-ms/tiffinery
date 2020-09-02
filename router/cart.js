const express = require("express");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Tiffin");
const router = express.Router();

router.post("/cart", async (req, res) => {
  //   const token = event.headers["Authorization"].replace("Bearer ", "");
  //   const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  //   const userId = payload["userId"];
  const { tiffinId } = req.body;
  console.log(tiffinId);
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
    tiffin: tiffinId,
    quantity: 1,
    userId: "1",
  };

  Cart.create(data, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

module.exports = router;
