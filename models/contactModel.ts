import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide Last Name"],
    },
    email: {
      type: String,
      required: [true, "Please provide Email Address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide Phone Number"],
    },
    message: {
      type: String,
      required: [true, "Please provide Message"],
    },
  },
  { timestamps: true },
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
