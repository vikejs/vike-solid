import {
  type Component,
  type ComponentProps,
  type JSX,
  type Setter,
  createMemo,
  createSignal,
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
export function clientOnly<T extends Component<any>>(
  fn: () => Promise<{ default: T } | T>,
  options: { lazy?: boolean } = {},
) {
  if (isServer) return (props: ComponentProps<T> & { fallback?: JSX.Element }) => <>{props.fallback}</>;

  const [comp, setComp] = createSignal<T>();
  if (!options.lazy) {
    load(fn, setComp);
  }
  // eslint-disable-next-line solid/reactivity
  return (props: ComponentProps<T>) => {
    let Comp: T | undefined;
    let m: boolean;
    const [, rest] = splitProps(props, ["fallback"]);
    if (options.lazy) {
      load(fn, setComp);
    }
    if ((Comp = comp()) && !sharedConfig.context) return Comp(rest);
    const [mounted, setMounted] = createSignal(!sharedConfig.context);
    onMount(() => setMounted(true));
    // eslint-disable-next-line solid/reactivity
    return createMemo(
      () => ((Comp = comp()), (m = mounted()), untrack(() => (Comp && m ? Comp(rest) : props.fallback))),
    ) as unknown as JSX.Element;
  };
}

function load<T>(fn: () => Promise<{ default: T } | T>, setComp: Setter<T>) {
  fn().then((m) => setComp(() => ("default" in (m as object) ? (m as any).default : m)));
}
