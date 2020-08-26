const express = require("express");
const router = express.Router();
const Tiffin = require("../models/Tiffins");

router.get("/", async (req, res) => {
  try {
    const res = await Tiffin.find({});
    console.log(res);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err);
  }
});

module.exports = router;
