import vpvs from "./vite-plugin-vike-solid";
import type { UserConfig } from "vite";

const root = process.cwd();

const config: UserConfig = {
  root,
  plugins: [vpvs()],
};

export default config;
