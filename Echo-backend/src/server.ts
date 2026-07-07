import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import "./shared/cache/redis-client.js";

const app = createApp();

app.listen(env.port, () => {
  console.log(`🚀 Server running on http://localhost:${env.port}`);
  console.log(`🔐 Environment: ${env.nodeEnv}`);
  connectDatabase();
});
