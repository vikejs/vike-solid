import type { Config } from "vike/types";
import vikeSolid from "vike-solid/config";

// Default config (can be overridden by pages)
export default {
  // <title>
  title: "My Vike Solid App",
  extends: vikeSolid,
} satisfies Config;
