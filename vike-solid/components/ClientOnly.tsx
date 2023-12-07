import type { Component, JSX } from "solid-js";
import { createEffect, createSignal, lazy, Suspense } from "solid-js";
import { Dynamic } from "solid-js/web";

function ClientOnlyError() {
  return <p>Error loading component.</p>
}

export function ClientOnly<T>(props: {
  load: () => Promise<{ default: Component<T> } | Component<T>>
  children: (Component: Component<T>) => JSX.Element
  fallback: JSX.Element
}) {
  const [getComponent, setComponent] = createSignal<Component<unknown> | undefined>(undefined);

  createEffect(() => {
    const loadComponent = () => {
      const Component = lazy(() =>
        props.load()
          .then((LoadedComponent) => {
            return { default: () => props.children("default" in LoadedComponent ? LoadedComponent.default : LoadedComponent) };
          })
          .catch((error) => {
            console.error("Component loading failed:", error);
            return { default: ClientOnlyError };
          })
      );
      setComponent(() => Component);
    };

    loadComponent();
  });

  return <Suspense fallback={props.fallback}><Dynamic component={getComponent()} /></Suspense>;
}
