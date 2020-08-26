const mongoose = require("mongoose");

const tiffinSchema = new mongoose.Schema({
  desc: {
    type: String,
  },
  menu: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  tiffinId: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
  },
});

module.exports = Tiffin = mongoose.model(Tiffin, tiffinSchema);
