const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  tiffin: {
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
