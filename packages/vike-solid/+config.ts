import type { Config } from "vike/types";
import { ssrEffect } from "./integration/ssrEffect.js";

export default {
  name: "vike-solid",
  require: {
    vike: ">=0.4.195",
  },

  vite: {
    ssr: {
      optimizeDeps: {
        include: ["solid-js/web"],
      },
    },
  },

  // https://vike.dev/onRenderHtml
  onRenderHtml: "import:vike-solid/__internal/integration/onRenderHtml:onRenderHtml",
  // https://vike.dev/onRenderClient
  onRenderClient: "import:vike-solid/__internal/integration/onRenderClient:onRenderClient",

  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,

  passToClient: ["_configFromHook"],

  // https://vike.dev/meta
  meta: {
    Head: {
      env: { server: true },
      cumulative: true,
    },
    Layout: {
      env: { server: true, client: true },
      cumulative: true,
    },
    Wrapper: {
      env: { server: true, client: true },
      cumulative: true,
    },
    title: {
      env: { server: true, client: true },
    },
    description: {
      env: { server: true },
    },
    image: {
      env: { server: true },
    },
    viewport: {
      env: { server: true },
    },
    favicon: {
      env: { server: true },
      global: true,
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
      cumulative: true,
    },
    htmlAttributes: {
      env: { server: true },
      global: true,
      cumulative: true, // for Vike extensions
    },
    bodyAttributes: {
      env: { server: true },
      global: true,
      cumulative: true, // for Vike extensions
    },
    onAfterRenderClient: {
      env: { server: false, client: true },
      cumulative: true,
    },
  },
} satisfies Config;

// This is required to make TypeScript load the global interfaces Vike.Config and Vike.PageContext so that they're always loaded: we can assume that the user always imports this file over `import vikeSolid from 'vike-solid/config'`
import "./types/Config.js";
import "./types/PageContext.js";
