export { useData };

import { createDataStore } from "./createDataStore.jsx";

/** Access `pageContext.data` from any SolidJS component
 *
 * See
 * - https://vike.dev/data
 * - https://vike.dev/pageContext-anywhere
 */
function useData<Data>(): Data {
  const [data] = createDataStore<Data>();

  return data;
}
