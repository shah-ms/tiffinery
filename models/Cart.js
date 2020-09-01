const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  tiffinId: {
    type: String,
  },
  userId: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

module.exports = Cart = mongoose.model("cart", CartSchema);
