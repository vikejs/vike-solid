import withSolid from "./with-solid.js";
import dts from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";

export default [
  withSolid({
    input: [
      "./renderer/+onRenderHtml.tsx",
      "./renderer/+config.ts",
      "./renderer/+passToClient.ts",
      "./components/usePageContext.tsx",
      "./cli/index.ts",
      "./index.ts",
    ],
    ssr: true,
    external: ["vite-plugin-ssr/server", "vite-plugin-ssr/plugin"],
  }),
  withSolid({
    input: [
      "./renderer/+onRenderClient.tsx",
      "./components/usePageContext.tsx",
      "./cli/index.ts",
    ],
    ssr: false,
    external: ["vite-plugin-ssr/server", "vite-plugin-ssr/plugin"],
  }),
  {
    input: [
      "./index.ts",
      "./components/usePageContext.tsx",
      "./vite-plugin-vike-solid.ts",
    ],
    output: [{ dir: "dist", format: "es" }],
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
    output: [{ file: "dist/vite-plugin-vike-solid.js", format: "es" }],
    external: ["vite"],
  },
];
