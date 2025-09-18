import { serve } from "bun";

const server = serve({
  routes: {
    "/essays/:slug": (k) => {
      return new Response(Bun.file(`./docs/essays/${k.params.slug}`));
    },
    "/": new Response(await Bun.file("./docs/index.html").bytes(), {}),
    "/index.css": new Response(await Bun.file("./docs/index.css").bytes(), {}),
    "/index.js": new Response(await Bun.file("./docs/index.js").bytes(), {}),
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
