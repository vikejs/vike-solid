export { PageContextProvider };
export { Context };

import { createContext, type JSX } from "solid-js";
import { type Store } from "solid-js/store";
import type { PageContext } from "vike/types";
import { getGlobalObject } from "../utils/getGlobalObject";

const { Context } = getGlobalObject("PageContextProvider.ts", {
  Context: createContext<Store<PageContext>>(),
});

function PageContextProvider(props: {
  pageContext: Store<PageContext>;
  children: JSX.Element;
}) {
  if (!props.pageContext) throw new Error("Argument pageContext missing");
  return (
    <Context.Provider value={props.pageContext}>
      {props.children}
    </Context.Provider>
  );
}
