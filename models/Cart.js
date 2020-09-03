const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  tiffin: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

module.exports = Cart = mongoose.model("cart", CartSchema);
