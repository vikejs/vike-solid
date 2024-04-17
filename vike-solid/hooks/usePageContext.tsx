export { usePageContext };

import { useContext } from "solid-js";
import { Context } from "../renderer/PageContextProvider.js";

/** Access the pageContext from any SolidJS component */
function usePageContext() {
  const pageContext = useContext(Context);
  if (!pageContext)
    throw new Error(
      "<PageContextProvider> is needed for being able to use usePageContext()"
    );
  return pageContext;
}
