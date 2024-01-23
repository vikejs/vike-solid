import type { Config } from "vike/types";
import vikeSolid from "vike-solid";

// Default config (can be overridden by pages)
export default {
  // <title>
  title: "My Vike Solid App",
  // <meta name="description">
  description: "Demo showcasing vike-solid",
  extends: vikeSolid,
} satisfies Config;
