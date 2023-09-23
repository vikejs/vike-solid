export { getTitle };

import type { PageContext } from "vite-plugin-ssr/types";

function getTitle(pageContext: PageContext): null | string {
  if (typeof pageContext.title === "string") {
    return pageContext.title;
  }
  if (pageContext.title) {
    throw new Error("pageContext.title should be a string");
  }
  const { title } = pageContext.config;
  if (typeof title === "string") {
    return title;
  }
  if (!title) {
    return null;
  }
  const { configDefinedAt } = pageContext.configEntries.title![0]!;
  if (typeof title === "function") {
    const val = title(pageContext);
    if (typeof val === "string") {
      return val;
    }
    if (val) {
      throw new Error(configDefinedAt + " should return a string");
    }
  }
  throw new Error(
    configDefinedAt + " should be a string or a function returning a string"
  );
}
