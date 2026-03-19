import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: [true, "Please provide your phone number"],
      trim: true,
    },

    numOfPassengers: {
      type: Number,
      required: [true, "Please provide number of passengers"],
    },

    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: [true, "Please select a car"],
    },

    pickUpLocation: {
      type: String,
      required: [true, "Please provide pick-up location"],
    },

    pickUpDateAndTime: {
      type: Date,
      required: [true, "Please provide pick-up date and time"],
    },

    dropOffLocation: {
      type: String,
    },

    dropOffDateAndTime: {
      type: Date,
    },

    note: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
    },

    childSeat: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "ongoing", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    stripeSessionId: {
      type: String, // Store this to verify payment later
    },
  },
  { timestamps: true },
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
