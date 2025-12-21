export { useHydrated };

import { type Accessor, createSignal, onMount } from "solid-js";
import { usePageContext } from "./usePageContext.js";

/**
 * Return a boolean indicating if the JS has been hydrated already.
 * When doing Server-Side Rendering, the result will always be false.
 * When doing Client-Side Rendering, the result will always be false on the
 * first render and true from then on. Even if a new component renders it will
 * always start with true.
 *
 * Example: Disable a button that needs JS to work.
 * ```tsx
 * const hydrated = useHydrated();
 * return (
 *   <button type="button" disabled={!hydrated()} onClick={doSomethingCustom}>
 *     Click me
 *   </button>
 * );
 * ```
 */
function useHydrated(): Accessor<boolean> {
  const pageContext = usePageContext();
  const [isHydrated, setIsHydrated] = createSignal(pageContext.isClientSide && !pageContext.isHydration);

  if (pageContext.isClientSide && !isHydrated()) {
    onMount(() => {
      setIsHydrated(true);
    });
  }

  return isHydrated;
}
