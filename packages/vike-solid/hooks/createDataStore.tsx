export { createDataStore };

import { createEffect } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import { usePageContext } from "./usePageContext.jsx";

/** Access `pageContext.data` from any SolidJS component, and create a store with `pageContext.data` as initial data.
 *
 * See
 * - https://vike.dev/data
 * - https://vike.dev/pageContext-anywhere
 */
function createDataStore<Data>(): [Data, SetStoreFunction<Data>] {
  const pageContext = usePageContext() as any;
  const [data, setData] = createStore(pageContext?.data);
  // Sync the store when the navigation (and thus `pageContext.data`) changes.
  createEffect(() => {
    setData(pageContext?.data);
  });
  return [data, setData];
}
