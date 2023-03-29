import withSolid from "./with-solid.js";

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
      "./renderer/+onPageTransitionStart.ts",
      "./renderer/+onPageTransitionEnd.ts",
      "./components/usePageContext.tsx",
      "./cli/index.ts",
    ],
    ssr: false,
    external: ["vite-plugin-ssr/server", "vite-plugin-ssr/plugin"],
  }),
];
