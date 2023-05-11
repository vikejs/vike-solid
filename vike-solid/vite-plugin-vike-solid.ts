import solidPlugin, { type Options as SolidOptions } from "vite-plugin-solid";
import ssr, { UserConfig } from "vite-plugin-ssr/plugin";
import { mergeConfig, type Plugin } from "vite";

export interface Options {
  solid?: SolidOptions;
  vps?: UserConfig;
}

function overrideConfig(): Plugin {
  return {
    name: "vite-plugin-vike-solid",
    config: () => ({
      optimizeDeps: { include: ["solid-js"] },
      ssr: {
        external: ["vike-solid", "vite-plugin-ssr/server"],
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
    ssr(
      mergeConfig(
        {
          extensions: [
            {
              npmPackageName: "vike-solid",
              pageConfigsDistFiles: [
                "vike-solid/renderer/+onRenderHtml.js",
                "vike-solid/renderer/+onRenderClient.js",
                "vike-solid/renderer/+config.js",
                "vike-solid/renderer/+passToClient.js",
              ],
            },
          ],
          disableAutoFullBuild: true,
        },
        options.vps ?? {}
      )
    ),
    overrideConfig(),
  ];
}
