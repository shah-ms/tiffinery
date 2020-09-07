const express = require("express");
const router = express.Router();
const conn = require("../db/db");

router.get("/", async (req, res) => {
  try {
    var sql = "SELECT * FROM tiffins";
    conn.query(sql, (err, result) => {
      console.log(result);
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
