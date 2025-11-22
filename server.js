import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import orderRoute from "./routes/orderRoute.js";


dotenv.config();

const port = process.env.PORT;
const db = process.env.MONGO_URI;
const server = express();

server.use(express.json());

server.use("/user", userRoute);
server.use("/auth", authRoute);
server.use("/order", orderRoute);

server.get("/", (req, res) => {
  res.send("IM RUNNIG THE GET ROUTE!!!");
});

mongoose
  .connect(db)
  .then(() => {
    server.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
