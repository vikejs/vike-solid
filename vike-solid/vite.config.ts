import vpvs from "./vite-plugin-vike-solid";
import type { UserConfig } from "vite";

const root = process.cwd();

const config: UserConfig = {
  root,
  plugins: [vpvs()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : undefined,
  },
};

export default config;
