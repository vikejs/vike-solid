import withSolid from "../vike-solid/with-solid.js";
import dts from "rollup-plugin-dts";

export default [
  withSolid({
    input: {
      "src/server": "./src/index.ts",
      "integration/+config": "./integration/+config.ts",
      "integration/Wrapper": "./integration/Wrapper.tsx",
    },
    ssr: true,
    external: ["vike-solid/usePageContext"],
  }),
  withSolid({
    input: {
      "src/index": "./src/index.ts",
    },
    ssr: false,
    external: [],
  }),
  {
    input: ["./src/index.ts", "./integration/+config.ts", "./integration/Wrapper.tsx"],
    output: [{ dir: "dist", format: "es", sanitizeFileName: false }],
    plugins: [dts()],
  },
];
