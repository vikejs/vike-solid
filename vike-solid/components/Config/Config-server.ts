export { Config };

import { useConfig } from "../../hooks/useConfig/useConfig-server.js";
import type { ConfigFromHook } from "../../types/Config.js";

/**
 * Set configurations inside Solid components.
 *
 * https://vike.dev/useConfig
 */
function Config(props: ConfigFromHook): null {
  const config = useConfig();
  config(props);
  return null;
}
