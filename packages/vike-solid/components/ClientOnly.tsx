import type { JSX } from "solid-js";
import { children as resolveChildren, Show } from "solid-js";
import { isServer } from "solid-js/web";
import { assert } from "../utils/assert.js";
import { useHydrated } from "../hooks/useHydrated.js";

/**
 * Render children only on the client-side.
 *
 * Children are completely removed and never loaded on the server.
 *
 * https://vike.dev/ClientOnly
 */
export function ClientOnly(props: { children?: JSX.Element; fallback?: JSX.Element }): JSX.Element {
  // Verify that the Babel transformer correctly stripped the children prop on server-side
  if (isServer) {
    // eslint-disable-next-line solid/reactivity
    assert(props.children === undefined);
  }

  const isHydrated = useHydrated();

  return (
    <Show when={!isServer && isHydrated()} fallback={props.fallback}>
      {resolveChildren(() => props.children)()}
    </Show>
  );
}
