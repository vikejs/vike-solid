import type { Config } from "vite-plugin-ssr/types";
import type { Component } from "./types.js";

export type UserConfig = Partial<
  VikeSolidConfig & { Page: Component } & Pick<
      Config,
      "route" | "prerender" | "iKnowThePerformanceRisksOfAsyncRouteFunctions"
    >
>;

export type VikeSolidConfig = {
  /** Solid element renderer and appended into &lt;head>&lt;/head> */
  Head: Component;
  Layout: Component;
  title: string;
  description: string;
  /**
   * @default 'en'
   */
  lang: string;
};

export default {
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
} satisfies Config;
