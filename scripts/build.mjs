import { build } from "vite";
import * as fs from "fs";

// marko vite

await build({ build: { ssr: "src/server.js" } });
console.log();
await build();

// vercel build output v3. https://vercel.com/docs/build-output-api/v3

fs.mkdirSync(".vercel/output/functions/server.func", { recursive: true });

fs.renameSync(
  ".vercel/output/static/server.js",
  ".vercel/output/functions/server.func/index.js"
);

fs.writeFileSync(
  ".vercel/output/functions/server.func/.vc-config.json",
  JSON.stringify({ runtime: "edge", entrypoint: "index.js" })
);

fs.writeFileSync(
  ".vercel/output/config.json",
  JSON.stringify({
    version: 3,
    routes: [
      {
        src: "/assets/.+",
        headers: { "cache-control": "public, immutable, max-age=31536000" },
      },
      { handle: "filesystem" },
      { src: "/.*", middlewarePath: "server" },
    ],
    cache: ["node_modules/**"],
  })
);
