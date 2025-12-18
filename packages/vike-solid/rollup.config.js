import withSolid from "./with-solid.js";
import dts from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

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
      "components/ClientOnly": "./components/ClientOnly.tsx",
    },
    ssr: true,
    external: ["vike/server", "vike/plugin", "vike/getPageContext", "./plugin/index.js"],
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
      "components/ClientOnly": "./components/ClientOnly.tsx",
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
      "./components/ClientOnly.tsx",
      "./vite-plugin-vike-solid.ts",
      "./plugin/index.ts",
    ],
    output: [{ dir: "dist", format: "es", sanitizeFileName: false }],
    plugins: [dts()],
  },
  {
    input: {
      "vite-plugin-vike-solid": "./vite-plugin-vike-solid.ts",
      "plugin/index": "./plugin/index.ts",
    },
    plugins: [
      nodeResolve({
        preferBuiltins: true,
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      }),
      commonjs(),
      babel({
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        babelHelpers: "bundled",
        presets: [
          "@babel/preset-typescript",
          ["@babel/preset-env", { 
            bugfixes: true,
            modules: false,
          }]
        ],
      }),
    ],
    output: [
      {
        dir: "dist",
        format: "es",
        sanitizeFileName: false,
      },
    ],
    external: ["vite", "vite-plugin-solid", "@babel/core", "@babel/types"],
  },
];
