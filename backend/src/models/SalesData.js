import mongoose from "mongoose";

const SalesDataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  product: { type: String, required: true },
  region: { type: String, required: true },
  sales: { type: Number, required: true },
  profit: { type: Number, required: true }
});

export default mongoose.model("SalesData", SalesDataSchema);
