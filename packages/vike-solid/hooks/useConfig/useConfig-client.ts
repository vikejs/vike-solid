export { useConfig };

import type { PageContext } from "vike/types";
import type { PageContextInternal } from "../../types/PageContext.js";
import type { ConfigFromHook } from "../../types/Config.js";
import { usePageContext } from "../usePageContext.js";
import { getPageContext } from "vike/getPageContext";
import { applyHeadSettings } from "../../integration/applyHeadSettings.jsx";

function useConfig(): (config: ConfigFromHook) => void {
  // Vike hook
  let pageContext = getPageContext() as PageContext & PageContextInternal;

  // Component
  if (!pageContext) pageContext = usePageContext() as PageContext & PageContextInternal;;
  return (config: ConfigFromHook) => {
    if (!("_headAlreadySet" in pageContext)) {
      setPageContextConfigFromHook(config, pageContext);
    } else {
      if (typeof window !== 'undefined') applyHead(config);
    }
  };
}

function setPageContextConfigFromHook(config: ConfigFromHook, pageContext: PageContextInternal) {
  pageContext._configFromHook ??= {};
  Object.assign(pageContext._configFromHook, config);
}

function applyHead(config: ConfigFromHook) {
  const { title, lang } = config;
  applyHeadSettings(title, lang);
}
