export type { Component } from "solid-js";

import type { Component, JSX } from "solid-js";

type Page = () => JSX.Element;

declare global {
  namespace Vike {
    interface ConfigResolved {
      Layout?: Array<Component>;
    }
    interface PageContext {
      // Page is undefined in onRenderHtml() when setting the `ssr` config flag to `false`
      Page?: Page;
    }
  }
}
