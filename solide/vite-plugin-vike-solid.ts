import solidPlugin, { type Options as SolidOptions } from "vite-plugin-solid";
import ssr from "vite-plugin-ssr/plugin";
import { mergeConfig, type Plugin } from "vite";

export interface Options {
  solid?: SolidOptions;
}

function overrideConfig(): Plugin {
  return {
    name: "vite-plugin-vike-solid",
    config: () => ({
      optimizeDeps: { include: ["solid-js"] },
      ssr: {
        external: ["solide", "vite-plugin-ssr/server"],
      },
    }),
  };
}

export default function (options: Options = {}): Plugin[] {
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
        options.solid ?? {}
      )
    ),
    ssr({
      extensions: [
        {
          npmPackageName: "solide",
          pageConfigsDistFiles: [
            "solide/renderer/+onRenderHtml.js",
            "solide/renderer/+onRenderClient.js",
            "solide/renderer/+config.js",
            "solide/renderer/+passToClient.js",
          ],
        },
      ],
      disableAutoFullBuild: true,
    }),
    overrideConfig(),
  ];
}
