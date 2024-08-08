import type { Config } from "vike/types";
import { ssrEffect } from "./renderer/ssrEffect.js";

// This is required to make TypeScript load the global interfaces such as Vike.PageContext so that they're always loaded.
// We can assume that the user always imports this file over `import vikeSolid from 'vike-solid/config'`
import "./types/index.js";

export default {
  name: "vike-solid",
  require: {
    vike: ">=0.4.182",
  },

  // https://vike.dev/onRenderHtml
  onRenderHtml: "import:vike-solid/renderer/onRenderHtml:onRenderHtml",
  // https://vike.dev/onRenderClient
  onRenderClient: "import:vike-solid/renderer/onRenderClient:onRenderClient",
  // https://vike.dev/clientRouting

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
