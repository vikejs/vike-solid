import { createStore } from "solid-js/store";

export { useData };

import { createEffect } from "solid-js";
import { usePageContext } from "./usePageContext.js";

/** Access `pageContext.data` from any SolidJS component
 *
 * See
 * - https://vike.dev/data
 * - https://vike.dev/pageContext-anywhere
 */
function useData<Data>(): Data {
  const ctx = usePageContext() as any;

  // sub store to keep reactivity https://github.com/vikejs/vike-solid/issues/114
  const [data, setData] = createStore(ctx.data);

  createEffect(() => {
    setData(ctx.data);
  });

  return data;
}
