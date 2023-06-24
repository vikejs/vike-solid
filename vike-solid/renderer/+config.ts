import type { Config as ConfigCore } from 'vite-plugin-ssr/types'
import type { Component } from "./types.js";

export type Config = ConfigCore & {
  /** Solid element renderer and appended into &lt;head>&lt;/head> */
  Head?: Component;
  Layout?: Component;
  title?: string;
  description?: string;
  /**
   * @default 'en'
   */
  lang?: string;
  Page?: Component;
};

// alias
export type UserConfig = Config;

export default {
  onRenderHtml: "import:vike-solid/renderer/onRenderHtml",
  onRenderClient: "import:vike-solid/renderer/onRenderClient",
  passToClient: ["pageProps", "title"],
  clientRouting: true,
  hydrationCanBeAborted: true,
  meta: {
    Head: {
      env: "server-only",
    },
    Layout: {
      env: "server-and-client",
    },
    title: {
      env: "server-and-client",
    },
    description: {
      env: "server-only",
    },
    lang: {
      env: "server-only",
    },
  },
} satisfies ConfigCore
