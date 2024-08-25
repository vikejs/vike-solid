export { Head };

import { useConfig } from "../../hooks/useConfig/useConfig-server.js";
import type { JSX } from "solid-js/jsx-runtime";

/**
 * Add arbitrary `<head>` tags.
 *
 * (The children are teleported to `<head>`.)
 *
 * https://vike.dev/Head
 */
function Head({ children }: { children: JSX.Element }): null {
  const config = useConfig();
  config({ Head: children });
  return null;
}
