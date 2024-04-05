import {
  Component,
  ComponentProps,
  createEffect,
  createMemo,
  createSignal,
  JSX,
  lazy,
  onMount,
  sharedConfig,
  splitProps,
  Suspense,
  untrack
} from "solid-js";
import { Dynamic, isServer } from "solid-js/web";

function ClientOnlyError() {
  return <p>Error loading component.</p>
}

/**
 * @deprecated Replaced by {@link clientOnly}
 */
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


// Copied from https://github.com/solidjs/solid-start/blob/2d75d5fedfd11f739b03ca34decf23865868ac09/packages/start/src/shared/clientOnly.tsx#L7
/**
 * Same as `clientOnly` from solid-start
 * @see {@link https://docs.solidjs.com/solid-start/reference/client/client-only}
 */
export function clientOnly<T extends Component<any>>(
  fn: () => Promise<{
    default: T;
  }>
) {
  if (isServer) return (props: ComponentProps<T> & { fallback?: JSX.Element }) => props.fallback;

  const [comp, setComp] = createSignal<T>();
  fn().then(m => setComp(() => m.default));
  return (props: ComponentProps<T>) => {
    let Comp: T | undefined;
    let m: boolean;
    const [, rest] = splitProps(props, ["fallback"]);
    if ((Comp = comp()) && !sharedConfig.context) return Comp(rest);
    const [mounted, setMounted] = createSignal(!sharedConfig.context);
    onMount(() => setMounted(true));
    return createMemo(
      () => (
        (Comp = comp()), (m = mounted()), untrack(() => (Comp && m ? Comp(rest) : props.fallback))
      )
    );
  };
}
