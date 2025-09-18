import { $, serve } from "bun";
import { watch } from "fs";

let server: any;

const restartServer = async () => {
  server = serve({
    routes: {
      "/essays/:slug": (k) => {
        return new Response(Bun.file(`./docs/essays/${k.params.slug}`));
      },
      "/": new Response(await Bun.file("./docs/index.html").bytes(), {}),
      "/index.css": new Response(
        await Bun.file("./docs/index.css").bytes(),
        {}
      ),
      "/index.js": new Response(await Bun.file("./docs/index.js").bytes(), {}),
    },

    development: process.env.NODE_ENV !== "production",
  });
  console.log(`🚀 Server running at ${server.url}`);
};

restartServer();

console.log(import.meta.dir);
const watcher = watch(
  import.meta.dir,
  { recursive: true },
  async (event, filename) => {
    console.log(`Detected ${event} in ${filename}`);
    server.stop();
    console.log(server);
    await $`bun run build`;
    // await $`bun run dev`;

    restartServer();
  }
);
