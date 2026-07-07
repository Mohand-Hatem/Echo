import { Redis } from "ioredis";
import { redisConfig } from "../../config/redis.js";

// Create a single, shared instance of the Redis client
export const redisClient = new Redis(redisConfig.url, {
  maxRetriesPerRequest: redisConfig.maxRetriesPerRequest,
});

redisClient.on("connect", () => {
  console.log("🟢 Connected to Redis successfully.");
});

redisClient.on("error", (error) => {
  console.error("🔴 Redis connection error:", error);
});
