import type { Config as ConfigCore } from "vite-plugin-ssr/types";
import type { Component } from "./types.js";

import type { Effect } from "vite-plugin-ssr/types";

export type Config = ConfigCore & {
  /** Solid element renderer and appended into <head></head> */
  Head?: Component;
  Layout?: Component;
  title?: string;
  description?: string;
  /**
   * @default 'en'
   */
  lang?: string;
  /**
   * If true, render mode is SSR or pre-rendering (aka SSG). In other words, the
   * page's HTML will be rendered at build-time or request-time.
   * If false, render mode is SPA. In other words, the page will only be
   * rendered in the browser.
   *
   * See https://vite-plugin-ssr.com/render-modes
   *
   * @default true
   *
   */
  ssr?: boolean;
  Page?: Component;
};

// alias
export type UserConfig = Config;

// Depending on the value of `config.meta.ssr`, set other config options' `env`
// accordingly.
// See https://vite-plugin-ssr.com/meta#modify-existing-configurations
const toggleSsrRelatedConfig: Effect = ({ configDefinedAt, configValue }) => {
  if (typeof configValue !== "boolean") {
    throw new Error(`${configDefinedAt} should be a boolean`);
  }

  return {
    meta: {
      // When the SSR flag is false, we want to render the page only in the
      // browser. We achieve this by then making the `Page` implementation
      // accessible only in the client's renderer.
      Page: {
        env: configValue
          ? "server-and-client" // default
          : "client-only",
      },
    },
  };
};

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
    ssr: {
      env: "config-only",
      effect: toggleSsrRelatedConfig,
    },
  },
} satisfies ConfigCore;