export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };
export type { Page };
export type { Component };

import type {
  PageContextBuiltIn,
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient,
} from "vite-plugin-ssr";
import type { SolideConfig } from "./+config";
import type { Component, JSX } from "solid-js";

type Page = (pageProps: PageProps) => JSX.Element;
type PageProps = Record<string, unknown>;
type WrapperComponent = ({ children }: { children: any }) => JSX.Element;

export type PageContextCommon = {
  Page: Page;
  pageProps?: PageProps;
  exports: {
    Layout?: WrapperComponent;
    Wrapper?: WrapperComponent;
  };
};

type PageContextServer = PageContextBuiltIn<Page> &
  PageContextCommon & {
    exports: Partial<SolideConfig>;
  };
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCommon;
type PageContext = PageContextClient | PageContextServer;
