export { useData };

import { usePageContext } from "./usePageContext.js";

/** Access `pageContext.data` from any SolidJS component
 *
 * See
 * - https://vike.dev/data
 * - https://vike.dev/pageContext-anywhere
 */
function useData<Data>(): Data {
  const { data } = usePageContext() as any;
  return data;
}
