import pluginSolid from "eslint-plugin-solid/configs/typescript";
import pluginTypescript from "typescript-eslint";

export default pluginTypescript.config(
  {
    files: [
      "packages/**/*.ts",
      "packages/**/*.tsx",
      "packages/**/*.js",
      "packages/**/*.jsx",
      "packages/**/*.mts",
      "packages/**/*.cts",
      "examples/**/*.ts",
      "examples/**/*.tsx",
      "examples/**/*.js",
      "examples/**/*.jsx",
      "examples/**/*.mts",
      "examples/**/*.cts",
    ],
  },
  {
    ignores: ["**/dist/"],
  },
  ...pluginTypescript.configs.recommended,
  pluginSolid,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-namespace": 0,
      "@typescript-eslint/no-unsafe-function-type": 0,
      "@typescript-eslint/no-unused-vars": [1, { argsIgnorePattern: "^_" }],
    },
  },
);
