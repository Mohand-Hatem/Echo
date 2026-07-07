import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase(): Promise<void> {
  try {
    mongoose.connection.on("connected", () => {
      console.log("🟢 Connected to MongoDB successfully.");
    });

    mongoose.connection.on("error", (error) => {
      console.error("🔴 MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("🟡 MongoDB disconnected.");
    });

    await mongoose.connect(env.mongodbUri);
  } catch (error) {
    console.error("💥 Failed to connect to MongoDB during startup:", error);
    process.exit(1);
  }
}
