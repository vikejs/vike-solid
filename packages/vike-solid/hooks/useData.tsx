export { useData };

import { createDataStore } from "./createDataStore.jsx";

/** Access `pageContext.data` from any SolidJS component.
 *
 * See
 * - https://vike.dev/data
 * - https://vike.dev/pageContext-anywhere
 */
function useData<Data>(): Data {
  // We use a store to sync the store when the navigation (and thus `pageContext.data`) changes.
  // https://github.com/vikejs/vike-solid/issues/114
  const [data] = createDataStore<Data>();
  return data;
}
