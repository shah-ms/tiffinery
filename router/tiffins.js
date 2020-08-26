const express = require("express");
const router = express.Router();
const Tiffin = require("../models/Tiffin");

router.get("/", async (req, res) => {
  try {
    const res = await Tiffin.find({});
    res.status(200).json(res);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
