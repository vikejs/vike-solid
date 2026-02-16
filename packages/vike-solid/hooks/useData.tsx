export { useData };

import { createDataStore } from "./createDataStore.jsx";

/** Access `pageContext.data` from any SolidJS component.
 *
 * https://vike.dev/useData
 */
function useData<Data>(): Data {
  // https://github.com/vikejs/vike-solid/issues/114
  // We use `createEffect` to sync the store when the navigation (and thus `pageContext.data`) changes.
  const [data] = createDataStore<Data>();
  return data;
}
