export type { Component } from "solid-js";

import type { JSX } from "solid-js";

type Page = (pageProps: PageProps) => JSX.Element;
type PageProps = Record<string, unknown>;

declare global {
  namespace Vike {
    interface PageContext {
      Page: Page;
      pageProps: Record<string, unknown>;
      title?: string;
    }
  }
}
