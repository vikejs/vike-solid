import { defineConfig } from "tsup-preset-solid";

export default defineConfig(
  [
    {
      entry: "./renderer/+onRenderHtml.tsx",
    },
    {
      entry: "./renderer/+onRenderClient.tsx",
    },
    {
      entry: "./renderer/+config.ts",
    },
    {
      entry: "./renderer/+passToClient.ts",
    },
    {
      entry: "./renderer/+onPageTransitionStart.ts",
    },
    {
      entry: "./renderer/+onPageTransitionEnd.ts",
    },
    {
      entry: "./components/usePageContext.tsx",
    },
    {
      entry: "./cli/index.ts",
      devEntry: true,
    },
    {
      entry: "./index.ts",
    },
  ],
  {
    // Setting `true` will console.log the package.json fields
    // printInstructions: true,
  }
);
