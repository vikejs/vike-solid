import type { Config } from "vike/types";
import vikeSolid from "vike-solid";
import Layout from "../layouts/LayoutDefault";
import Head from "./Head";

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: "My Vike Solid App",
  ssr: true, // can be removed since `true` is the default
  extends: vikeSolid,
} satisfies Config;
