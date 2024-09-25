import withSolid from "../vike-solid/with-solid.js";
import dts from "rollup-plugin-dts";

export default [
  withSolid({
    input: {
      "src/server": "./src/index.ts",
    },
    ssr: true,
    external: [],
  }),
  withSolid({
    input: {
      "src/index": "./src/index.ts",
    },
    ssr: false,
    external: [],
  }),
  {
    input: ["./src/index.ts"],
    output: [{ dir: "dist/src", format: "es", sanitizeFileName: false }],
    plugins: [dts()],
  },
];
