export type { Component } from "solid-js";

import type { JSX } from "solid-js";

type Page = (pageProps: PageProps) => JSX.Element;
type PageProps = Record<string, unknown>;

declare global {
  namespace Vike {
    interface PageContext {
      // Note: Page will typically be undefined in onRenderHtml() when setting the `ssr` config flag
      // to `false` (SPA mode).
      Page?: Page;

      /** Properties of the page's root Solid component. */
      pageProps?: Record<string, unknown>;

      /** &lt;title>${title}&lt;/title> - has precedence over the config */
      title?: string;
    }
  }
}
