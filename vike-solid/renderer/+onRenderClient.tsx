// https://vike.dev/onRenderClient
export { onRenderClient };

import { hydrate, render } from "solid-js/web";
import { getTitle } from "./getTitle";
import type { OnRenderClientAsync, PageContextClient } from "vike/types";
import { getPageElement } from "./getPageElement";
import { createStore, reconcile } from "solid-js/store";

const [pageContextStore, setPageContext] = createStore<PageContextClient>(
  {} as PageContextClient
);

let dispose: () => void;
let rendered = false;

const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  if (!rendered) {
    // Dispose to prevent duplicate pages when navigating.
    if (dispose) dispose();

    setPageContext(pageContext);

    const container = document.getElementById("page-view")!;
    if (container.innerHTML !== "" && pageContext.isHydration) {
      // Hydration
      dispose = hydrate(() => getPageElement(pageContextStore)!, container);
    } else {
      // First rendering
      dispose = render(() => getPageElement(pageContextStore)!, container);
    }
    rendered = true;
  } else {
    // Client routing
    // See https://vike.dev/server-routing-vs-client-routing

    setPageContext(reconcile(pageContext));

    // Get the page's `title` config value, which may be different from the
    // previous page. It can even be null, in which case we should unset the
    // document title.
    const title = getTitle(pageContext);
    document.title = title || "";
  }
};
