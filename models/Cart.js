const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  tiffin: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

module.exports = Cart = mongoose.model("cart", CartSchema);
