import {
  type Component,
  type ComponentProps,
  createMemo,
  createSignal,
  type JSX,
  onMount,
  sharedConfig,
  splitProps,
  untrack,
} from "solid-js";
import { isServer } from "solid-js/web";

// Copied from https://github.com/solidjs/solid-start/blob/2d75d5fedfd11f739b03ca34decf23865868ac09/packages/start/src/shared/clientOnly.tsx#L7
/**
 * Load and render a component only on the client-side.
 * @see {@link https://vike.dev/clientOnly}
 */
export function clientOnly<T extends Component<any>>(fn: () => Promise<{ default: T } | T>) {
  if (isServer) return (props: ComponentProps<T> & { fallback?: JSX.Element }) => <>{props.fallback}</>;

  const [comp, setComp] = createSignal<T>();
  fn().then((m) => setComp(() => ("default" in m ? m.default : m)));
  return (props: ComponentProps<T>) => {
    let Comp: T | undefined;
    let m: boolean;
    const [, rest] = splitProps(props, ["fallback"]);
    if ((Comp = comp()) && !sharedConfig.context) return Comp(rest);
    const [mounted, setMounted] = createSignal(!sharedConfig.context);
    onMount(() => setMounted(true));
    return createMemo(
      () => ((Comp = comp()), (m = mounted()), untrack(() => (Comp && m ? Comp(rest) : props.fallback))),
    );
  };
}
