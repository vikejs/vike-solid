import withSolid from "./with-solid.js";
import dts from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";

export default [
  withSolid({
    input: {
      "renderer/onRenderHtml": "./renderer/onRenderHtml.tsx",
      "+config": "./+config.ts",
      "hooks/usePageContext": "./hooks/usePageContext.tsx",
      "hooks/useData": "./hooks/useData.tsx",
      "helpers/clientOnly": "./helpers/clientOnly.tsx",
    },
    ssr: true,
    external: ["vike/server", "vike/plugin"],
  }),
  withSolid({
    input: {
      "renderer/onRenderClient": "./renderer/onRenderClient.tsx",
      "hooks/usePageContext": "./hooks/usePageContext.tsx",
      "hooks/useData": "./hooks/useData.tsx",
    },
    ssr: false,
    external: ["vike/server", "vike/plugin"],
  }),
  {
    input: [
      "./+config.ts",
      "./hooks/usePageContext.tsx",
      "./hooks/useData.tsx",
      "./helpers/clientOnly.tsx",
      "./vite-plugin-vike-solid.ts",
    ],
    output: [{ dir: "dist", format: "es", sanitizeFileName: false }],
    plugins: [dts()],
  },
  {
    input: "./vite-plugin-vike-solid.ts",
    plugins: [
      babel({
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        babelHelpers: "bundled",
        presets: ["@babel/preset-typescript"],
      }),
    ],
    output: [
      {
        file: "dist/vite-plugin-vike-solid.js",
        format: "es",
        sanitizeFileName: false,
      },
    ],
    external: ["vite"],
  },
];
