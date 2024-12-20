import type { PageContext } from "vike/types";
import { usePageContext, PageContextProvider } from "../hooks/usePageContext.js";
import type { FlowComponent, JSX } from "solid-js";
import { createComponent, createComputed } from "solid-js";
import { Dynamic } from "solid-js/web";
import { createStore, reconcile, type Store } from "solid-js/store";

export function getPageElement(pageContext: Store<PageContext>): JSX.Element {
  const page = (
    <PageContextProvider pageContext={pageContext}>
      <Wrapper>
        <Page />
      </Wrapper>
    </PageContextProvider>
  );
  return page;
}

function Wrapper(props: { children: JSX.Element }) {
  const pageContext = usePageContext();

  const [wrappers, setWrappers] = createStore<FlowComponent[]>([]);

  createComputed(() => {
    setWrappers(
      reconcile(
        [
          // Inner wrapping
          ...(pageContext.config.Layout || []),
          // Outer wrapping
          ...(pageContext.config.Wrapper || []),
        ].reverse(),
      ),
    );
  });

  const renderWrappers = (i: number) => {
    let item = wrappers[i]; // Assumes reversed, and must access with `[i]` instead of `.at(i)` otherwise, wrapper's states are not persisted.

    if (!item) return props.children;

    if (typeof item !== "function") item = Passthrough;

    return createComponent(item, {
      get children(): JSX.Element {
        return renderWrappers(i + 1);
      },
    });
  };

  return <>{renderWrappers(0)}</>;
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
