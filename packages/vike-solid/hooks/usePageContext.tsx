export { usePageContext };
export { PageContextProvider };

import { type JSX, createContext, useContext } from "solid-js";
import { type Store } from "solid-js/store";
import type { PageContext } from "vike/types";
import { getGlobalObject } from "../utils/getGlobalObject.js";

const globalContext = getGlobalObject("PageContextProvider.ts", {
  solidContext: createContext<Store<PageContext>>(undefined as never),
});

function PageContextProvider(props: {
  pageContext: Store<PageContext>;
  children: JSX.Element;
}) {
  const { solidContext } = globalContext;
  // eslint-disable-next-line solid/reactivity
  return <solidContext.Provider value={props.pageContext}>{props.children}</solidContext.Provider>;
}

/**
 * Access `pageContext` from any Solid component.
 *
 * https://vike.dev/usePageContext
 */
function usePageContext(): PageContext {
  const { solidContext } = globalContext;
  const pageContext = useContext(solidContext)!;
  return pageContext;
}
