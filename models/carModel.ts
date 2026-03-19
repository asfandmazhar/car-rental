import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      required: [true, "Please provide at least one image"],
    },

    title: {
      type: String,
      required: [true, "Please provide the car title"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Please provide car slug"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    location: {
      type: String,
      required: [true, "Please provide the car location"],
      trim: true,
    },

    year: {
      type: Number,
      required: [true, "Please provide the year of manufacture"],
    },

    seats: {
      type: Number,
      required: [true, "Please provide number of seats"],
    },

    doors: {
      type: Number,
      required: [true, "Please provide number of doors"],
    },

    suitcaseCapacity: {
      type: Number,
      required: [true, "Please provide suitcase capacity"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide a category"],
    },

    transmission: {
      type: String,
      required: [true, "Please provide transmission type"],
      enum: ["manual", "automatic"],
    },

    fuelType: {
      type: String,
      required: [true, "Please provide fuel type"],
      enum: ["petrol", "diesel", "electric", "hybrid"],
    },

    description: {
      type: String,
      required: [true, "Please provide a description"],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
