import type { Config } from "vike/types";
import vikeSolid from "vike-solid/config";
import Layout from "../layouts/LayoutDefault.js";
import Head from "./Head.js";

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: "My Vike Solid App",
  ssr: true, // can be removed since `true` is the default
  stream: true,
  extends: vikeSolid,
} satisfies Config;
