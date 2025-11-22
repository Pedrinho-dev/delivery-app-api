import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (_, res) => {
    const getUser = await User.find();
    res.send(getUser)
})

export default router;