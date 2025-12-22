import type { JSX } from "solid-js";
import { children as resolveChildren, Show } from "solid-js";
import { assert } from "../utils/assert.js";
import { useHydrated } from "../hooks/useHydrated.js";
import { usePageContext } from "../hooks/usePageContext.jsx";

/**
 * Render children only on the client-side.
 *
 * Children are completely removed and never loaded on the server.
 *
 * https://vike.dev/ClientOnly
 */
export function ClientOnly(props: { children?: JSX.Element; fallback?: JSX.Element }): JSX.Element {
  const pageContext = usePageContext();
  // Assert tree-shaking: children should be removed on the server-side
  if (!pageContext.isClientSide) {
    // eslint-disable-next-line solid/reactivity
    assert(props.children === undefined);
  }

  const hydrated = useHydrated();

  return (
    <Show when={hydrated()} fallback={props.fallback}>
      {resolveChildren(() => props.children)()}
    </Show>
  );
}
