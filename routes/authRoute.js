import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";

const env = dotenv.config()

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, password, rating } = req.body;

    const hashedPassword = await bcrypt.hash(password, 6);
    const user = await User.create({ name, password: hashedPassword, rating });
    res.send(user)
});

router.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ name });
        if (!user) return res.status(404).send("User not found !!")

        const validPassword =  await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(404).send("Invalid password!!")

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' })

        res.json({ user: user, token: token })

    } catch (err) {
        res.send(err)
    }

})

export default router;