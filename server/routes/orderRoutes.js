const express = require("express");
const router = express.Router();
const PizzaOrder = require("../models/PizzaOrder");

// Place Order
router.post("/place-order", async (req, res) => {
  try {
    const { customerName, base, sauce, cheese, veggies } = req.body;

    const newOrder = new PizzaOrder({
      customerName,
      base,
      sauce,
      cheese,
      veggies,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Pizza Order Placed Successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Place Order",
      error: error.message,
    });
  }
});

// Get All Orders
router.get("/all-orders", async (req, res) => {
  try {
    const orders = await PizzaOrder.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetch Orders",
      error: error.message,
    });
  }
});

// Update Order Status
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await PizzaOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Order Status Updated",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Update Status",
      error: error.message,
    });
  }
});

// Delete Order
router.delete("/delete-order/:id", async (req, res) => {
  try {
    await PizzaOrder.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Delete Order",
      error: error.message,
    });
  }
});

module.exports = router;