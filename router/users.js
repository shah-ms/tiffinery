const express = require("express");
const jwt = require("jsonwebtoken");
const Nexmo = require("nexmo");
const conn = require("../db/db");

require("dotenv").config();

const nexmo = new Nexmo({
  apiKey: "3f43bd78",
  apiSecret: "My9MkIHkRN7eDbRR",
});

const router = express.Router();

let otpRequestId = 0;
let phone = 0;

function generateAccessToken(paylod) {
  return jwt.sign({ phoneNo: payload }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
  });
}

router.post("/login", async (req, res) => {
  try {
    let { phoneNo } = req.body;
    let phone = parseInt(phoneNo);
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
          res.status(200).send("OTP Sent");
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/verify", async (req, res) => {
  try {
    console.log(otpRequestId);
    let { otp } = req.body;

    nexmo.verify.check(
      {
        request_id: otpRequestId,
        code: otp,
      },
      (err, result) => {
        if (result["status"] == "0") {
          var sql = "INSERT INTO users(phoneNo) VALUES(?)";
          conn.query(sql, `${phone}`, (err, result) => {
            if (err) {
              res.status(400).json(err);
            } else {
              var token = generateAccessToken(phone);
              res.status(200).json(token);
            }
          });
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
