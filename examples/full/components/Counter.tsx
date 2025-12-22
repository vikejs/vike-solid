export { Counter };
export default Counter;

import { createSignal } from "solid-js";
import { useHydrated } from "vike-solid/useHydrated";

function Counter() {
  const [count, setCount] = createSignal(0);
  const hydrated = useHydrated();
  return (
    <button disabled={!hydrated()} onClick={() => setCount((count) => count + 1)}>
      Counter {count()}
    </button>
  );
}
