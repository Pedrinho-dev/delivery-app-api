import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


// Create
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    const populated = await Order.findById(saved._id).populate("idClient");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all
router.get("/", async (_, res) => {
  try {
    const orders = await Order.find().populate("idClient");

    res.status(200).json(
      orders.map((o) => ({
        ...o._doc,
        schedule: new Date(o.schedule).toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
      }))
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// Pending
router.get("/pending", async (_, res) => {
  try {
    const pending = await Order.find({ accept: false }).populate("idClient");
    res.status(200).json(pending);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("idClient");
    if (!order) return res.status(404).json("Order not found");
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate("idClient");
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const del = await Order.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json("Order not found");
    res.status(200).json("Order deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
