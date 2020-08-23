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

let otpRequestId = 0;

function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
  });
}

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
        if (!err) {
          otpRequestId = result["request_id"];
          console.log(typeof otpRequestId);
          res.status(200).send("OTP Sent");
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/verify", async (req, res) => {
  try {
    console.log(req.body);
    let { otp } = req.body;
    // let code = parseInt(otp);

    nexmo.verify.check(
      {
        apiKey: "3f43bd78",
        apiSecret: "My9MkIHkRN7eDbRR",
        request_id: otpRequestId,
        code: otp,
      },
      (err, result) => {
        if (result["status"] === 0) {
          res.status(200).send("Success");
        } else {
          res.status(401).send("Invalid OTP");
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err);
  }
});

module.exports = router;
