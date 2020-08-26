const express = require("express");
const jwt = require("jsonwebtoken");
const Nexmo = require("nexmo");
require("dotenv").config();

const nexmo = new Nexmo({
  apiKey: "3f43bd78",
  apiSecret: "My9MkIHkRN7eDbRR",
});

const router = express.Router();

let otpRequestId = 0;

function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.ACCESS_TOKEN_KEY, {
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
          res.status(200).json("OTP Verified");
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
