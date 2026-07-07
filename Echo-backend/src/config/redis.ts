import { env } from "./env.js";

export const redisConfig = {
  url: env.redisUrl,
  // Required by BullMQ to function correctly on top of Redis
  maxRetriesPerRequest: null,
};
