import type { PageContext } from "vike/types";
import { usePageContext, PageContextProvider } from "../hooks/usePageContext.js";
import type { FlowComponent, JSX } from "solid-js";
import { createComponent, createComputed } from "solid-js";
import { Dynamic } from "solid-js/web";
import { createStore, reconcile, type Store } from "solid-js/store";

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

  const [layouts, setLayouts] = createStore<FlowComponent[]>([]);

  createComputed(() => {
    setLayouts(reconcile(pageContext.config.Layout!));
  });
  const renderLayouts = (i: number = 0) => {
    let item = layouts.at(-(i + 1));

    if (!item) return props.children;

    if (typeof item !== "function") item = Passthrough;

    return createComponent(item, {
      get children(): JSX.Element {
        return renderLayouts(i + 1);
      },
    });
  };

  return renderLayouts();
}

function Page() {
  const pageContext = usePageContext();
  return (
    <>
      <Dynamic component={pageContext.Page} />
    </>
  );
}

function Passthrough(props: { children: JSX.Element }) {
  return <>{props.children}</>;
}
