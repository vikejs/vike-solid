import vikeSolid from "vike-solid/config";
import type { Config } from "vike/types";

// Default config (can be overridden by pages)
export default {
  // <title>
  title: "My Vike + Solid App",
  bodyAttributes: {
    class: "dark",
  },
  extends: vikeSolid,
} satisfies Config;
