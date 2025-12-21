import type { JSX } from "solid-js";
import { children as resolveChildren, createSignal, onMount, Show } from "solid-js";
import { isServer } from "solid-js/web";
import { assert } from "../utils/assert.js";

/**
 * Render children only on the client-side.
 *
 * Strips the children prop on server-side to remove
 * the component from the server bundle.
 *
 * https://vike.dev/ClientOnly
 */
export function ClientOnly(props: { children?: JSX.Element; fallback?: JSX.Element }): JSX.Element {
  // Verify that the Babel transformer correctly stripped the children prop on server-side
  if (isServer) {
    // eslint-disable-next-line solid/reactivity
    assert(props.children === undefined);
  }

  const [mounted, setMounted] = createSignal(false);

  onMount(() => setMounted(true));

  return (
    <Show when={!isServer && mounted()} fallback={props.fallback}>
      {resolveChildren(() => props.children)()}
    </Show>
  );
}

/**
 * Return a boolean indicating if the JS has been hydrated already.
 * When doing Server-Side Rendering, the result will always be false.
 * When doing Client-Side Rendering, the result will always be false on the
 * first render and true from then on. Even if a new component renders it will
 * always start with true.
 *
 * Example: Disable a button that needs JS to work.
 * ```tsx
 * let hydrated = useHydrated();
 * return (
 *   <button type="button" disabled={!hydrated} onClick={doSomethingCustom}>
 *     Click me
 *   </button>
 * );
 * ```
 */
function useHydrated() {
  // TODO/ai implement using pageContext.isClientSide and pageContext.isHydration
}
