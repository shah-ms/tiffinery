const express = require("express");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "3f43bd78",
  apiSecret: "My9MkIHkRN7eDbRR",
});

const router = express.Router();

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "tiffinery",
});

function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
  });
}

// router.post("/users/login", async (req, res) => {
//   try {
//     let { phoneNo } = req.body;
//     var sql = `SELECT * from users WHERE username=?`;
//     conn.query(sql, user, (err, result) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         if (Object.keys(result).length === 1) {
//           const isPassword = bcrypt.compare(password, result[0].password);
//           if (!isPassword) {
//             res.status(401).send({ msg: "Invalid Credentials" });
//           } else {
//             const token = generateAccessToken(result[0].userId);
//             res.send(200).send({ token: token });
//           }
//         } else {
//           res.send(401).send({ msg: "User already exists" });
//         }
//       }
//     });
//   } catch (e) {
//     res.status(400).send(err);
//   }
// });

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    let { phoneNo } = req.body;
    let phone = parseInt(phoneNo);
    console.log(typeof phone);
    console.log(phone);
    nexmo.verify.request(
      {
        number: `91${phone}`,
        brand: "Vonage",
        code_length: "4",
        action_type: "sms",
      },
      (err, result) => {
        if(!err) {
        res.status(200).send('OTP Sent');
      }
    }
  );} catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
