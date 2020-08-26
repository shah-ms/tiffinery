const express = require("express");
const router = express.Router();
const tiffin = require("../models/Tiffin");

router.get("/", async (req, res) => {
  try {
    const res = await tiffin.find({});
    console.log(res);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err);
  }
});

module.exports = router;
