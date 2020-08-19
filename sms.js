const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "3f43bd78",
  apiSecret: "My9MkIHkRN7eDbRR",
});

// const from = "Vonage APIs";
// const to = "+917720005680";
// const text = "<#> Welcome to Tiffinery! Your OTP is 8794";

// nexmo.message.sendSms(from, to, text, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     if (res.messages[0]["status"] === "0") {
//       console.log("Message sent successfully");
//     } else {
//       console.log(res.messages[0]["error-text"]);
//     }
//   }
// });

nexmo.verify.request(
  {
    number: "917720005680",
    brand: "Vonage",
    code_length: "4",
    action_type: "sms",
  },
  (err, result) => {
    console.log(err ? err : result);
  }
);
