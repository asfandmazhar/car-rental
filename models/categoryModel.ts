import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    imgURL: {
      type: String,
      required: [true, "Please provide Image URL"],
      trim: true,
    },

    title: {
      type: String,
      required: [true, "Please provide Service Title"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Please provide Service Slug"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    start: {
      type: Number,
      required: [true, "Please provide Starting Point"],
      min: 0,
    },

    end: {
      type: Number,
      required: [true, "Please provide Ending Point"],
      min: 0,
    },

    price: {
      type: Number,
      required: [true, "Please provide Price"],
      min: 0,
    },

    pricePerKM: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
