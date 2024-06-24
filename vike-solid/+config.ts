import type { Config } from "vike/types";
import { ssrEffect } from "./renderer/ssrEffect.js";

// This is required to make TypeScript load the global interfaces such as Vike.PageContext so that they're always loaded.
// We can assume that the user always imports this file over `import vikeSolid from 'vike-solid/config'`
import "./types/index.js";

export default {
  name: "vike-solid",
  require: {
    vike: ">=0.4.173",
  },

  // https://vike.dev/onRenderHtml
  onRenderHtml: "import:vike-solid/renderer/onRenderHtml:onRenderHtml",
  // https://vike.dev/onRenderClient
  onRenderClient: "import:vike-solid/renderer/onRenderClient:onRenderClient",
  // https://vike.dev/clientRouting

  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,

  // https://vike.dev/meta
  meta: {
    Head: {
      env: { server: true },
    },
    Layout: {
      env: { server: true, client: true },
      cumulative: true,
    },
    title: {
      env: { server: true, client: true },
    },
    favicon: {
      env: { server: true, client: true },
    },
    lang: {
      env: { server: true, client: true },
    },
    ssr: {
      env: { config: true },
      effect: ssrEffect,
    },
    stream: {
      env: { server: true },
    },
    // Vike already defines the setting 'name', but we redundantly define it here for older Vike versions (otherwise older Vike versions will complain that 'name` is an unknown config).
    name: {
      env: { config: true },
    },
    // Vike already defines the setting 'require', but we redundantly define it here for older Vike versions (otherwise older Vike versions will complain that 'require` is an unknown config). TODO/eventually: remove this once <=0.4.172 versions become rare (also because we use the `require` setting starting from `0.4.173`).
    require: {
      env: { config: true },
    },
  },
} satisfies Config;
