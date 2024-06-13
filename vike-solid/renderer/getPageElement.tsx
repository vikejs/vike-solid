import type { PageContext } from "vike/types";
import { PageContextProvider } from "./PageContextProvider.js";
import { usePageContext } from "../hooks/usePageContext.js";
import type { JSX, FlowComponent, FlowProps, ParentComponent } from "solid-js";
import { createComponent, createComputed, createEffect, createMemo, For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { createStore, reconcile, unwrap, type Store } from "solid-js/store";

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
  })
  const renderLayouts = (i: number = 0) => {
    let item: FlowComponent = layouts[i];

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

/**
 * Utility for tracking non-primitive values inside a store. (e.g. Arrays, Objects, Functions).
 *
 * Otherwise, your createMemo or createEffect won't run even if it actually changed.
 *
 * Reference: https://github.com/solidjs/solid/discussions/829#discussioncomment-2102335
 */
function deepTrack(store: any) {
  for (const k in store) {
    const value = store[k];
    if (typeof value === "object") {
      deepTrack(value);
    }
  }
}

