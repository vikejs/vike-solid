export { config };

import type { Config, ConfigEffect, PageContext } from "vike/types";
import type { Component } from "solid-js";

// Depending on the value of `config.meta.ssr`, set other config options' `env`
// accordingly.
// See https://vike.dev/meta#:~:text=Modifying%20the%20environment%20of%20existing%20hooks
const toggleSsrRelatedConfig: ConfigEffect = ({
  configDefinedAt,
  configValue,
}) => {
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
          ? { server: true, client: true } // default
          : { client: true },
      },
    },
  };
};

const config = {
  // @ts-ignore Remove this ts-ignore once Vike's new version is released.
  name: 'vike-solid',
  // https://vike.dev/onRenderHtml
  onRenderHtml: "import:vike-solid/renderer/onRenderHtml:onRenderHtml",
  // https://vike.dev/onRenderClient
  onRenderClient: "import:vike-solid/renderer/onRenderClient:onRenderClient",
  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,
  // https://vike.dev/meta
  meta: {
    Head: {
      env: { server: true },
    },
    Layout: {
      env: { server: true, client: true },
    },
    title: {
      env: { server: true, client: true },
    },
    favicon: {
      env: { server: true, client: true },
    },
    lang: {
      env: { server: true, client: true },
    },
    ssr: {
      env: { config: true },
      effect: toggleSsrRelatedConfig,
    },
    stream: {
      env: { server: true },
    },
    // Vike already defines the setting 'name', but we redundantly define it here for older Vike versions (otherwise older Vike versions will complain that 'name` is an unknown config).
    name: {
      env: { config: true }
    },
  },
} satisfies Config;

// We purposely define the ConfigVikeSolid interface in this file: that way we ensure it's always applied whenever the user `import vikeSolid from 'vike-solid/config'`
// https://vike.dev/pageContext#typescript
declare global {
  namespace VikePackages {
    interface ConfigVikeSolid {
      /** The page's root Solid component */
      Page?: Component;
      /** Solid element renderer and appended into <head></head> */
      Head?: Component;
      /** A component, usually common to several pages, that wraps the root component `Page` */
      Layout?: Component;
      title?: string | ((pageContext: PageContext) => string);
      favicon?: string;
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
       * See https://vike.dev/render-modes
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
       */
      stream?: boolean;
    }
  }
}
