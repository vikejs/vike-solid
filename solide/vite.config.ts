import solidPlugin from "vite-plugin-solid";
import ssr from "vite-plugin-ssr/plugin";
import type { UserConfig } from "vite";

const root = process.cwd();

const config: UserConfig = {
  root,
  plugins: [
    solidPlugin({
      ssr: true,
    }),
    ssr({
      extensions: [
        {
          npmPackageName: "solide",
          pageConfigsDistFiles: [
            "solide/renderer/+onRenderHtml.js",
            "solide/renderer/+onRenderClient.js",
            "solide/renderer/+config.js",
            "solide/renderer/+passToClient.js",
            "solide/renderer/+onPageTransitionStart.js",
            "solide/renderer/+onPageTransitionEnd.js",
          ],
        },
      ],
      disableAutoFullBuild: true,
    }),
  ],
  optimizeDeps: { include: ["solid-js"] },
  ssr: {
    external: ["solide", "vite-plugin-ssr/server"],
  },
};

export default config;
