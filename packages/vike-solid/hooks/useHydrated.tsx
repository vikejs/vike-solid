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
 * https://vike.dev/useHydrated
 *
 * Example: Disable a button that needs JS to work.
 * ```tsx
 * const hydrated = useHydrated();
 * return (
 *   <button type="button" disabled={!hydrated()} onClick={doSomething}>
 *     Click me
 *   </button>
 * );
 * ```
 */
function useHydrated(): Accessor<boolean> {
  const pageContext = usePageContext();
  const [hydrated, setHydrated] = createSignal(pageContext.isClientSide && !pageContext.isHydration);

  if (pageContext.isClientSide && pageContext.isHydration) {
    onMount(() => {
      setHydrated(true);
    });
  }

  return hydrated;
}
