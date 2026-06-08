const mongoose = require("mongoose");

const pizzaOrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    base: {
      type: String,
      required: true,
    },

    sauce: {
      type: String,
      required: true,
    },

    cheese: {
      type: String,
      required: true,
    },

    veggies: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      default: "Order Received",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PizzaOrder", pizzaOrderSchema);