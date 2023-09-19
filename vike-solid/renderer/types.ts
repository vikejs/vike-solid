export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };
export type { Page };

import type {
  PageContextBuiltInServer,
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient,
} from "vite-plugin-ssr/types";
import type { JSX } from "solid-js";

export type { Component } from "solid-js";

type Page = (pageProps: PageProps) => JSX.Element;
type PageProps = Record<string, unknown>;
type WrapperComponent = ({ children }: { children: any }) => JSX.Element;

export type PageContextCommon = {
  Page: Page;
  pageProps?: PageProps;
  config: {
    Layout?: WrapperComponent;
    Wrapper?: WrapperComponent;
  };
};

type PageContextServer = PageContextBuiltInServer<Page> & PageContextCommon;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCommon;
type PageContext = PageContextClient | PageContextServer;
