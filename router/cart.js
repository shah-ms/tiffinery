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
});

module.exports = router;
