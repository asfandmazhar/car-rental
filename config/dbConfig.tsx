import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected successfully!");
    });

    mongoose.connection.on("error", (err) => {
      console.error(
        "❌ Database connection error. Make sure MongoDB is running.",
        err,
      );
      process.exit(1);
    });
  } catch (error) {
    console.error(
      "⚠️ Something went wrong while connecting to the database:",
      error,
    );
    process.exit(1);
  }
};
