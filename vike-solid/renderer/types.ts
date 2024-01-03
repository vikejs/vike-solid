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

      // TODO/next-major-release: remove pageProps (i.e. tell users to use data() instead of onBeforeRender() to fetch data)
      /** Properties of the page's root Solid component - e.g. set by onBeforeRender() hook */
      pageProps?: Record<string, unknown>;

      // TODO/next-major-release: remove support for setting title over onBeforeRender()
      /** &lt;title>${title}&lt;/title> - set by onBeforeRender() hook, has precedence over the config */
      title?: string;

      // Needed by getTitle()
      data?: {
        /** &lt;title>${title}&lt;/title> - set by data() hook, has precedence over the onBeforeRender() hook */
        title?: string;
      };
    }
  }
}
