import type { Config } from "vike-solid";
import Layout from "../layouts/LayoutDefault";

// Default config (can be overriden by pages)
export default {
  Layout,
  // <title>
  title: "My Vike Solid App",
  // <meta name="description">
  description: "Demo showcasing vike-solid",
} satisfies Config;
