import { createSignal } from "solid-js";
import { useHydrated } from 'vike-solid/useHydrated';

export function Counter() {
  const [count, setCount] = createSignal(0);
  const isHydrated = useHydrated()
  return <button disabled={!isHydrated()} onClick={() => setCount((count) => count + 1)}>Counter {count()}</button>;
}
