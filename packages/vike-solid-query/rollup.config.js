import withSolid from "../vike-solid/with-solid.js";
import dts from "rollup-plugin-dts";

export default [
  withSolid({
    input: {
      "integration/+config": "./integration/+config.ts",
      "integration/Wrapper": "./integration/Wrapper.tsx",
    },
    ssr: true,
    external: ["vike-solid/usePageContext"],
  }),
  {
    input: ["./integration/+config.ts", "./integration/Wrapper.tsx"],
    output: [{ dir: "dist", format: "es", sanitizeFileName: false }],
    plugins: [dts()],
  },
];
