import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxpeople: {
      type: Number,
      required: true,
      max: 3,
    },
    desc: {
      type: String,
    },
    roomnumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("room", roomSchema);
