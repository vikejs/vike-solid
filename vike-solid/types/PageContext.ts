import type { JSX } from "solid-js";

// https://vike.dev/pageContext#typescript
declare global {
    namespace Vike {
      interface PageContext {
        /** The root React component of the page */
        Page?: () => JSX.Element
      }
    }
  }
  