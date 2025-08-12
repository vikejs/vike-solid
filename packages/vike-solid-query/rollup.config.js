import withSolid from "../vike-solid/with-solid.js";
import dts from "rollup-plugin-dts";

export default [
  withSolid({
    input: {
      server: "./src/index.ts",
      "integration/+config": "./src/integration/+config.ts",
      "integration/Wrapper": "./src/integration/Wrapper.tsx",
    },
    ssr: true,
    external: ["vike-solid/usePageContext"],
  }),
  withSolid({
    input: {
      index: "./src/index.ts",
    },
    ssr: false,
    external: [],
  }),
  {
    input: {
      index: "./src/index.ts",
      "integration/+config": "./src/integration/+config.ts",
      "integration/Wrapper": "./src/integration/Wrapper.tsx",
    },
    output: [{ dir: "dist", format: "es", sanitizeFileName: false }],
    plugins: [dts()],
  },
];
