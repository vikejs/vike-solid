import type { Config } from "vike-solid";
import vikeSolid from "vike-solid";
import Layout from "../layouts/LayoutDefault";
import Head from "./Head";

// Default config (can be overriden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: "My Vike Solid App",
  // <meta name="description">
  description: "Demo showcasing vike-solid",
  extends: vikeSolid,
} satisfies Config;
