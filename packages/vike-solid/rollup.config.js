import withSolid from "./with-solid.js";
import dts from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";

export default [
  withSolid({
    input: {
      "integration/onRenderHtml": "./integration/onRenderHtml.tsx",
      "+config": "./+config.ts",
      "hooks/usePageContext": "./hooks/usePageContext.tsx",
      "hooks/useData": "./hooks/useData.tsx",
      "hooks/useConfig/useConfig-client": "./hooks/useConfig/useConfig-client.ts",
      "hooks/useConfig/useConfig-server": "./hooks/useConfig/useConfig-server.ts",
      "components/Config/Config-client": "./components/Config/Config-client.ts",
      "components/Config/Config-server": "./components/Config/Config-server.ts",
      "components/Head/Head-client": "./components/Head/Head-client.ts",
      "components/Head/Head-server": "./components/Head/Head-server.ts",
      "helpers/clientOnly": "./helpers/clientOnly.tsx",
    },
    ssr: true,
    external: ["vike/server", "vike/plugin", "vike/getPageContext"],
  }),
  withSolid({
    input: {
      "integration/onRenderClient": "./integration/onRenderClient.tsx",
      "hooks/usePageContext": "./hooks/usePageContext.tsx",
      "hooks/useData": "./hooks/useData.tsx",
      "hooks/useConfig/useConfig-client": "./hooks/useConfig/useConfig-client.ts",
      "hooks/useConfig/useConfig-server": "./hooks/useConfig/useConfig-server.ts",
      "components/Config/Config-client": "./components/Config/Config-client.ts",
      "components/Config/Config-server": "./components/Config/Config-server.ts",
      "components/Head/Head-client": "./components/Head/Head-client.ts",
      "components/Head/Head-server": "./components/Head/Head-server.ts",
    },
    ssr: false,
    external: ["vike/server", "vike/plugin", "vike/getPageContext"],
  }),
  {
    input: [
      "./+config.ts",
      "./hooks/usePageContext.tsx",
      "./hooks/useData.tsx",
      "./hooks/useConfig/useConfig-client.ts",
      "./hooks/useConfig/useConfig-server.ts",
      "./components/Config/Config-client.ts",
      "./components/Config/Config-server.ts",
      "./components/Head/Head-client.ts",
      "./components/Head/Head-server.ts",
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
