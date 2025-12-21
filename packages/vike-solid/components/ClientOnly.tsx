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
