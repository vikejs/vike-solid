import vpvs from "./vite-plugin-vike-solid.js";
import type { UserConfig } from "vite";

const root = process.cwd();

// Return `UserConfigInterop` instead of `UserConfig` to avoid type mismatch upon different Vite versions
type UserConfigInterop = Record<string, unknown>;
const config: UserConfigInterop = {
  root,
  plugins: [vpvs()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : undefined,
  },
} satisfies UserConfig;

export default config;
