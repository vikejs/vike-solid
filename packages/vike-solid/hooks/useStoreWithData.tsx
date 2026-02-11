export { useStoreWithData };

import { createEffect } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import { usePageContext } from "./usePageContext.js";

/** Access `pageContext.data` from any SolidJS component
 *
 * See
 * - https://vike.dev/data
 * - https://vike.dev/pageContext-anywhere
 */
function useStoreWithData<Data>(): [Data, SetStoreFunction<Data>] {
  const pageContext = usePageContext() as any;

  // sub store to keep reactivity https://github.com/vikejs/vike-solid/issues/114
  const [data, setData] = createStore(pageContext?.data);

  createEffect(() => {
    setData(pageContext?.data);
  });

  return [data, setData];
}
