// https://vike.dev/meta#typescript
import type { Component, JSX } from "solid-js";

import type {
  PageContextServer,
  // Rename it to `PageContext_` to be able to reference it from within `namespace Vike`
  // - https://stackoverflow.com/questions/46559021/typescript-use-of-global-type-inside-namespace-with-same-type
  // - https://github.com/Microsoft/TypeScript/issues/983
  PageContext as PageContext_,
  PageContextClient,
} from "vike/types";
import type { TagAttributes } from "../utils/getTagAttributesString";
import type { Viewport } from "../renderer/onRenderHtml";
import type { ConfigFromHookCumulative } from "../hooks/useConfig/useConfig-server";

declare global {
  namespace Vike {
    interface Config {
      /**
       * The page's root Solid component.
       *
       * https://vike.dev/Page
       */
      Page?: () => JSX.Element;

      /**
       * Add arbitrary `<head>` tags.
       *
       * https://vike.dev/Head
       */
      Head?: Head;

      /**
       * A component that defines the visual layout common to several pages.
       *
       * Technically: the `<Layout>` component wraps the root component `<Page>`.
       *
       * https://vike.dev/Layout
       */
      Layout?: Component;

      /**
       * Set the page's tilte.
       *
       * Generates:
       * ```jsx
       * <head>
       *   <title>{title}</title>
       *   <meta property="og:title" content={title} />
       * </head>
       * ```
       *
       * https://vike.dev/title
       */
      title?: string | null | ((pageContext: PageContext_) => string | null | undefined);

      /**
       * Set the page's description.
       *
       * Generates:
       * ```jsx
       * <head>
       *   <meta name="description" content={description}>
       *   <meta property="og:description" content={description}>
       * </head>
       * ```
       *
       * https://vike.dev/description
       */
      description?: string | null | ((pageContext: PageContextServer) => string | null | undefined);

      /**
       * Set the page's preview image upon URL sharing.
       *
       * Generates:
       * ```jsx
       * <head>
       *   <meta property="og:image" content={image}>
       *   <meta name="twitter:card" content="summary_large_image">
       * </head>
       * ```
       *
       * https://vike.dev/image
       */
      image?: string | null | ((pageContext: PageContextServer) => string | null | undefined);

      /**
       * Set the page's width shown to the user on mobile/tablet devices.
       *
       * @default "responsive"
       *
       * https://vike.dev/viewport
       */
      viewport?: Viewport | ((pageContext: PageContextServer) => Viewport | undefined);

      /**
       * Set the page's favicon.
       *
       * Generates:
       * ```jsx
       * <head>
       *   <link rel="icon" href={favicon} />
       * </head>
       * ```
       *
       * https://vike.dev/favicon
       */
      favicon?: string | null | ((pageContext: PageContextServer) => string | null | undefined);

      /**
       * Set the page's language (`<html lang>`).
       *
       * @default 'en'
       *
       * https://vike.dev/lang
       */
      lang?: string | null | ((pageContext: PageContext_) => string | null | undefined);

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
       * @default true
       *
       * https://vike.dev/ssr
       */
      ssr?: boolean;

      /**
       * Whether to stream the page's HTML. Requires Server-Side Rendering (`ssr: true`).
       *
       * If `true`, the stream will be a Node Stream. If you need a Web Stream, use `stream: 'web'`.
       *
       * @default false
       *
       * https://vike.dev/stream
       */
      stream?: boolean | "web";

      /**
       * Client-side hook called after the page is rendered.
       *
       * https://vike.dev/onAfterRenderClient
       */
      onAfterRenderClient?: (pageContext: PageContextClient) => void;
    }
    interface ConfigResolved {
      Layout?: Array<Component>;
      Head?: Array<Head>;
      bodyAttributes?: TagAttributes[];
      htmlAttributes?: TagAttributes[];
      onAfterRenderClient?: Function[];
    }
  }
}

export type Head = Component | JSX.Element;

// JSDocs are preserved
type PickWithoutGetter<T, K extends keyof T> = {
  [P in K]: Exclude<T[P], Function>;
};
export type ConfigFromHook = PickWithoutGetter<
  Vike.Config,
  "Head" | "title" | "description" | "image" | "favicon" | "lang" | "viewport"
>;
export type ConfigFromHookResolved = Omit<ConfigFromHook, ConfigFromHookCumulative> &
  Pick<Vike.ConfigResolved, ConfigFromHookCumulative>;
