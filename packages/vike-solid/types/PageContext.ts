import type { JSX } from "solid-js";
import type { ConfigFromHookResolved, Stream } from "./Config";

// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      /** The root Solid component of the page */
      Page?: () => JSX.Element;
    }
  }
}

// hack for following issue
// [!] RollupError: Exported variable "global" is not defined in "types/PageContext.ts"
export const global = null;

// Internal usage
export type PageContextInternal = {
  _configFromHook?: ConfigFromHookResolved;
  _headAlreadySet?: boolean;
  _stream?: Stream;
};
