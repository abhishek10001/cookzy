import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cookId: { type: String, required: true },
  bookingDate: { type: String, required: true },
  bookingTime: { type: String, required: true },
  userData: { type: String, required: true },
  cookData: { type: Object, required: true },
  amount: { type: String, required: true },
  date:{type: Date, required: true},
  guestCount: { type: Number, default: 1 }, // Added guest count field
  cancelled: { type: String, required: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false }
});

const bookingModel = mongoose.models.booking || mongoose.model("booking", bookingSchema);

export default bookingModel;

