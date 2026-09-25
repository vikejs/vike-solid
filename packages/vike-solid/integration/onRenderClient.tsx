// https://vike.dev/onRenderClient
export { onRenderClient };

import { hydrate, render } from "solid-js/web";
import { getHeadSetting } from "./getHeadSetting.js";
import type { OnRenderClientAsync, PageContextClient } from "vike/types";
import { getPageElement } from "./getPageElement.js";
import { createStore } from "solid-js/store";
import { callCumulativeHooks } from "../utils/callCumulativeHooks.js";
import type { PageContextInternal } from "../types/PageContext.js";
import { applyHeadSettings } from "./applyHeadSettings.jsx";

const [pageContextStore, setPageContext] = createStore<PageContextClient>({} as PageContextClient);

let dispose: () => void;
let rendered = false;

const onRenderClient: OnRenderClientAsync = async (
  pageContext: PageContextClient & PageContextInternal,
): ReturnType<OnRenderClientAsync> => {
  if (!pageContext.isHydration) {
    // Applied before rendering the page, so that the settings set by useConfig() inside components take precedence (they
    // are applied while rendering, see useConfig-client.ts)
    applyHead(pageContext);
  }
  pageContext._headAlreadySet = true;

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

  // Use cases:
  // - Custom user settings: https://vike.dev/head-tags#custom-settings
  // - Testing tools: https://github.com/vikejs/vike-react/issues/95
  await callCumulativeHooks(pageContext.config.onAfterRenderClient, pageContext);
};

function applyHead(pageContext: PageContextClient) {
  const title = getHeadSetting<string | null>("title", pageContext);
  const lang = getHeadSetting<string | null>("lang", pageContext);
  const description = getHeadSetting<string | null>("description", pageContext);
  applyHeadSettings(title, lang, description);
}
