// https://vike.dev/meta#typescript
import type { Component, JSX } from "solid-js";

import type {
  // Rename it to `PageContext_` to be able to reference it from within `namespace Vike`
  // - https://stackoverflow.com/questions/46559021/typescript-use-of-global-type-inside-namespace-with-same-type
  // - https://github.com/Microsoft/TypeScript/issues/983
  PageContext as PageContext_,
} from "vike/types";
import type { TagAttributes } from "../utils/getTagAttributesString";

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
      title?: string | ((pageContext: PageContext_) => string);

      /** <link rel="icon" href="${favicon}" /> */
      favicon?: string;

      /**
       * Set the page's language (`<html lang>`).
       *
       * @default 'en'
       *
       * https://vike.dev/lang
       */
      lang?: string | ((pageContext: PageContext_) => string) | null;

      /**
       * Add tag attributes such as `<html class="dark">`.
       *
       * https://vike.dev/htmlAttributes
       */
      htmlAttributes?: TagAttributes;

      /**
       * Add tag attributes such as `<body class="dark">`.
       *
       * https://vike.dev/bodyAttributes
       */
      bodyAttributes?: TagAttributes;

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
       * If true, the stream will be a Node Stream. If you need a Web Stream, use `stream: 'web'`.
       *
       * @default false
       *
       * https://vike.dev/stream
       *
       */
      stream?: boolean | "web";
    }
    interface ConfigResolved {
      Layout?: Array<Component>;
      bodyAttributes?: TagAttributes[];
      htmlAttributes?: TagAttributes[];
    }
  }
}
