import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  clientLoc: { type: String },
  destinyLoc: { type: String },
  schedule: { type: Date },
  accept: { type: Boolean, default: false },
  idClient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  locDeliveryMan: { type: String },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;