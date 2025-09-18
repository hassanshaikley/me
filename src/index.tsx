import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    // Serve a file by buffering it in memory
    "/essays.json": new Response(await Bun.file("./docs/essays.json").bytes(), {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
