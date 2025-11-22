import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Create a new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    const formattedOrders = orders.map((order) => {
      return {
        ...order._doc,
        schedule: new Date(order.schedule).toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
      };
    });

    res.status(200).json(formattedOrders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get orders with accept = false (Pending)
router.get("/pending", async (req, res) => {
  try {
    const pendingOrders = await Order.find({ accept: false });
    res.status(200).json(pendingOrders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json("Order not found");
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update order
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json("Order not found");
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete order
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json("Order not found");
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
