import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  clientLoc: { type: String },
  destinyLoc: { type: String },
  locDeliveryMan: { type: String },
  schedule: { type: Date },
  accept: { type: Boolean, default: false },
  finalLoc: { type: Boolean, default: false },
  idClient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;