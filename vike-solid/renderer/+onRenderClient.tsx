export default onRenderClient;

import { hydrate, render } from "solid-js/web";
import { getTitle } from "./getTitle";
import type { PageContextClient } from "vike/types";
import { getPageElement } from "./getPageElement";
import { createStore, reconcile } from "solid-js/store";

const [pageContextStore, setPageContext] = createStore<PageContextClient>(
  {} as PageContextClient
);

let dispose: () => void;
let rendered = false;

async function onRenderClient(pageContext: PageContextClient) {
  if (!rendered) {
    // Dispose to prevent duplicate pages when navigating.
    if (dispose) dispose();

    setPageContext(pageContext);

    const container = document.getElementById("page-view")!;
    if (container.innerHTML !== "" && pageContext.isHydration) {
      dispose = hydrate(() => getPageElement(pageContextStore)!, container);
    } else {
      dispose = render(() => getPageElement(pageContextStore)!, container);
    }
    rendered = true;
  } else {
    setPageContext(reconcile(pageContext));
  }

  const title = getTitle(pageContext);
  if (title !== null) {
    document.title = title;
  }
}
