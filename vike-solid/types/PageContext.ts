import type { JSX } from "solid-js";
import type { ConfigFromHookResolved } from "./Config";

// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      /** The root Solid component of the page */
      Page?: () => JSX.Element;
    }
  }
}

// Internal usage
export type PageContextInternal = {
  _configFromHook?: ConfigFromHookResolved;
  _headAlreadySet?: boolean;
};
