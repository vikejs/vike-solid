// https://vike.dev/meta#typescript
import type { Component, JSX } from "solid-js";

declare global {
  namespace Vike {
    interface Config {
      /** The page's root Solid component */
      Page?: () => JSX.Element;

      /** Solid element renderer and appended into <head></head> */
      Head?: Component;

      /**
       * A component that defines the visual layout of the page common to several pages.
       *
       * Technically: the `<Layout>` component wraps the root component `<Page>`.
       *
       * https://vike.dev/Layout
       */
      Layout?: Component;

      /** <title>${title}</title> */
      title?: string | ((pageContext: PageContext) => string);

      /** <link rel="icon" href="${favicon}" /> */
      favicon?: string;
      
      /** <html lang="${lang}">
       *
       *  @default 'en'
       *
       */
      lang?: string;

      /**
       * If `true`, the page is rendered twice: on the server-side (to HTML) and on the client-side (hydration).
       *
       * If `false`, the page is rendered only once in the browser.
       *
       * https://vike.dev/ssr
       *
       * @default true
       *
       */
      ssr?: boolean;
      
      /**
       * Whether to stream the page's HTML. Requires Server-Side Rendering (`ssr: true`).
       *
       * @default false
       *
       * https://vike.dev/stream
       *
       */
      stream?: boolean;
    }
    interface ConfigResolved {
        Layout?: Array<Component>;
      }
  }
}
