export { createDataStore };

import { createEffect } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import { usePageContext } from "./usePageContext.jsx";

/** Access `pageContext.data` from any SolidJS component
 *
 * See
 * - https://vike.dev/data
 * - https://vike.dev/pageContext-anywhere
 */
function createDataStore<Data>(): [Data, SetStoreFunction<Data>] {
  const pageContext = usePageContext() as any;

  // https://github.com/vikejs/vike-solid/issues/114
  // Use a Store to wrap `pageContext.data` and ensure fine-grained reactivity for Objects
  const [data, setData] = createStore(pageContext?.data);

  // Sync the Store when the navigation (`pageContext.data`) changes
  createEffect(() => {
    setData(pageContext?.data);
  });

  return [data, setData];
}
