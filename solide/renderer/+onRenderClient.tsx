export default onRenderClient;

import { hydrate, render } from "solid-js/web";
import { getTitle } from "./getTitle";
import type { PageContextClient } from "./types";
import { getPageElement } from "./getPageElement";

let dispose: () => void;

async function onRenderClient(pageContext: PageContextClient) {
  // Dispose to prevent duplicate pages when navigating.
  if (dispose) dispose();

  const page = getPageElement(pageContext)!;

  const container = document.getElementById("page-view")!;
  if (pageContext.isHydration) {
    hydrate(() => page, container);
  } else {
    render(() => page, container);
  }

  const title = getTitle(pageContext);
  if (title !== null) {
    document.title = title;
  }
}
