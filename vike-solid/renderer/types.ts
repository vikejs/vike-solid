export type { Component } from "solid-js";

import type { JSX } from "solid-js";

type Page = () => JSX.Element;

declare global {
  namespace Vike {
    interface PageContext {
      // Page is undefined in onRenderHtml() when setting the `ssr` config flag to `false`
      Page?: Page;
    }
  }
}
