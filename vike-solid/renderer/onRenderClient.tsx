// https://vike.dev/onRenderClient
export { onRenderClient };

import { hydrate, render } from "solid-js/web";
import { getHeadSetting } from "./getHeadSetting.js";
import type { OnRenderClientAsync, PageContextClient } from "vike/types";
import { getPageElement } from "./getPageElement.js";
import { createStore } from "solid-js/store";

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

    const title = getHeadSetting("title", pageContext) || "";
    const lang = getHeadSetting("lang", pageContext) || "en";

    // We skip if the value is undefined because we shouldn't remove values set in HTML (by the Head setting).
    //  - This also means that previous values will leak: upon client-side navigation, the title set by the previous
    //    page won't be removed if the next page doesn't override it. But that's okay because usually pages always have
    //    a favicon and title, which means that previous values are always overridden. Also, as a workaround, the user
    //    can set the value to `null` to ensure that previous values are overridden.
    if (title !== undefined) document.title = title;
    if (lang !== undefined) document.documentElement.lang = lang;
  }
};
