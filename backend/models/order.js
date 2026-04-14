const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: Array,
  totalAmount: Number,
  totalTime: Number,
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);