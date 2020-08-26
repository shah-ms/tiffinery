const express = require("express");
const router = express.Router();
const Tiffin = require("../models/Tiffin");

router.get("/", async (req, res) => {
  try {
    const result = await Tiffin.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
