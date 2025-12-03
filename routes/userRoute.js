import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import bcrypt from "bcrypt";

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (_, res) => {
  const getUser = await User.find();
  res.send(getUser);
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 6);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        password: hashedPassword,
        rating: req.body.rating,
      },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json("User not found");
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
