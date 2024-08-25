import solidPlugin, { type Options as SolidOptions } from "vite-plugin-solid";
import { mergeConfig, type Plugin } from "vite";

function overrideConfig(): Plugin {
  return {
    name: "vite-plugin-vike-solid",
    config: () => ({
      optimizeDeps: {
        include: ["solid-js", "vike-solid/integration/onRenderClient"],
      },
    }),
  };
}

export default function (options: Partial<SolidOptions> = {}): Plugin[] {
  return [
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
}
