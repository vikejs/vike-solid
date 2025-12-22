export { useHydrated };

import { type Accessor, createSignal, onMount } from "solid-js";
import { usePageContext } from "./usePageContext.js";

/**
 * Whether the page has already been hydrated.
 *
 * On the server, it always returns `false`. On the client, it returns `false` on first render and `true` after hydration completes.
 *
 * https://vike.dev/useHydrated
 *
 * Example: Disable a button that needs JavaScript to work.
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
