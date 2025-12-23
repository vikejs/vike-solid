import solidPlugin, { type Options as SolidOptions } from "vite-plugin-solid";
import { mergeConfig, type Plugin } from "vite";

function overrideConfig(): Plugin {
  return {
    name: "vite-plugin-vike-solid",
    config: () => ({
      optimizeDeps: {
        include: ["solid-js", "vike-solid/__internal/integration/onRenderClient"],
      },
    }),
  };
}

type PluginInterop = Record<string, unknown> & { name: string };
// Return `PluginInterop` instead of `Plugin` to avoid type mismatch upon different Vite versions
export default function (options: Partial<SolidOptions> = {}): PluginInterop[] {
  const plugins: Plugin[] = [
    solidPlugin(
      mergeConfig(
        {
          ssr: true,
          typescript: {
            onlyRemoveTypeImports: true,
          },
          solid: {
            hydratable: true,
          },
        },
        options ?? {},
      ),
    ),
    overrideConfig(),
  ];
  return plugins as PluginInterop[];
}
