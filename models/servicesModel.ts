import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    imgURL: {
      type: String,
      required: [true, "Please provide Image URL"],
    },
    title: {
      type: String,
      required: [true, "Please provide Service Title"],
    },
    description: {
      type: String,
      required: [true, "Please provide Service Description"],
    },
  },
  { timestamps: true },
);

const Services =
  mongoose.models.Services || mongoose.model("Services", servicesSchema);

export default Services;
