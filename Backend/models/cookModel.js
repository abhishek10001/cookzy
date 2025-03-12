import mongoose from "mongoose";

const cookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    image: { type: String, required: true, unique: true },
    speciality: { type: String, required: true },
    signatureDish: {
      type: Object,
      default: {
        dish1: "",
        dish2: "",
        dish3: "",
        dish4: "",
        dish5: "",
        dish6: "",
      },
    },
    review: { type: String },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },

    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Date, required: true },
    slots_booked: { type: Object, default: {} },
  },
  { minimize: false }
);

const cookModel = mongoose.model.cook || mongoose.model("cook", cookSchema);

export default cookModel;
