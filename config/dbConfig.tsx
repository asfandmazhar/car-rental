import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// We use a global object to cache the connection in dev mode
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

export const connectDB = async (): Promise<typeof mongoose> => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables.");
  }

  // Reuse existing connection if available
  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose
      .connect(MONGO_URI)
      .then((mongooseInstance) => {
        // Attach listeners only once
        if (!mongoose.connection.listeners("connected").length) {
          mongoose.connection.on("connected", () => {
            console.log("✅ Database connected successfully!");
          });
        }

        if (!mongoose.connection.listeners("error").length) {
          mongoose.connection.on("error", (err) => {
            console.error(
              "❌ Database connection error. Make sure MongoDB is running.",
              err,
            );
            process.exit(1);
          });
        }

        return mongooseInstance;
      });
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
};
