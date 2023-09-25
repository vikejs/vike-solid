import type { PageContext } from "vite-plugin-ssr/types";
import { PageContextProvider, usePageContext } from "./PageContextProvider";
import type { JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Store } from "solid-js/store";

export function getPageElement(pageContext: Store<PageContext>): JSX.Element {
  const page = (
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Page />
      </Layout>
    </PageContextProvider>
  );
  return page;
}

function Layout(props: { children: JSX.Element }) {
  const pageContext = usePageContext();
  return (
    <Dynamic component={pageContext.config.Layout ?? Passthrough}>
      {props.children}
    </Dynamic>
  );
}

function Page() {
  const pageContext = usePageContext();
  return (
    <>
      <Dynamic
        component={pageContext.Page}
        {...(pageContext.pageProps ?? {})}
      />
    </>
  );
}

function Passthrough(props: { children: JSX.Element }) {
  return <>{props.children}</>;
}
