// https://vike.dev/onRenderClient
export { onRenderClient };

import { hydrate, render } from "solid-js/web";
import { getHeadSetting } from "./getHeadSetting.js";
import type { OnRenderClientAsync, PageContextClient } from "vike/types";
import { getPageElement } from "./getPageElement.js";
import { createStore } from "solid-js/store";
import { callCumulativeHooks } from "../utils/callCumulativeHooks.js";

const [pageContextStore, setPageContext] = createStore<PageContextClient>({} as PageContextClient);

let dispose: () => void;
let rendered = false;

const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  if (!rendered) {
    // Dispose to prevent duplicate pages when navigating.
    if (dispose) dispose();

    setPageContext(pageContext);

    const container = document.getElementById("root")!;
    if (container.innerHTML !== "" && pageContext.isHydration) {
      // Hydration
      dispose = hydrate(() => getPageElement(pageContextStore)!, container);
    } else {
      // First rendering
      dispose = render(() => getPageElement(pageContextStore)!, container);
    }
    rendered = true;
  } else {
    // Client-side navigation

    setPageContext(pageContext);
  }

  if (!pageContext.isHydration) {
    // E.g. document.title
    updateDocument(pageContext);
  }

  // Use cases:
  // - Custom user settings: https://vike.dev/head-tags#custom-settings
  // - Testing tools: https://github.com/vikejs/vike-react/issues/95
  await callCumulativeHooks(pageContext.config.onAfterRenderClient, pageContext);
};

function updateDocument(pageContext: PageContextClient) {
  const title = getHeadSetting("title", pageContext);
  const lang = getHeadSetting("lang", pageContext);

  // - We skip if `undefined` as we shouldn't remove values set by the Head setting.
  // - Setting a default prevents the previous value to be leaked: upon client-side navigation, the value set by the previous page won't be removed if the next page doesn't override it.
  //   - Most of the time, the user sets a default himself (i.e. a value defined at /pages/+config.js)
  //     - If he doesn't have a default then he can use `null` to opt into Vike's defaults
  if (title !== undefined) document.title = title || "";
  if (lang !== undefined) document.documentElement.lang = lang || "en";
}
