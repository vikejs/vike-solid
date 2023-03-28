export default onRenderClient;

import { hydrate, render } from "solid-js/web";
import { getTitle } from "./getTitle";
import type { PageContextClient } from "./types";
import { getPageElement } from "./getPageElement";

let dispose: () => void;

async function onRenderClient(pageContext: PageContextClient) {
  // Dispose to prevent duplicate pages when navigating.
  if (dispose) dispose();

  const container = document.getElementById("page-view")!;
  if (pageContext.isHydration) {
    dispose = hydrate(() => getPageElement(pageContext)!, container);
  } else {
    dispose = render(() => getPageElement(pageContext)!, container);
  }

  const title = getTitle(pageContext);
  if (title !== null) {
    document.title = title;
  }
}
