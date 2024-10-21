import { join, normalize } from "node:path";
import { defineConfig } from "tsup";
import { type PresetOptions, generateTsupOptions, normalizeFilepath, parsePresetOptions } from "tsup-preset-solid";

const preset_options: PresetOptions = {
  entries: [
    {
      name: "config",
      entry: "./+config.ts",
    },
    {
      name: "__internal/integration/onRenderHtml",
      entry: "./integration/onRenderHtml.tsx",
      server_entry: true,
    },
    {
      name: "__internal/integration/onRenderClient",
      entry: "./integration/onRenderClient.tsx",
    },
    {
      name: "usePageContext",
      entry: "./hooks/usePageContext.tsx",
    },
    {
      name: "useData",
      entry: "./hooks/useData.tsx",
    },
    {
      name: "useConfig",
      entry: "./hooks/useConfig/useConfig-client.ts",
      server_entry: "./hooks/useConfig/useConfig-server.ts",
    },
    {
      name: "Config",
      entry: "./components/Config/Config-client.ts",
      server_entry: "./components/Config/Config-server.ts",
    },
    {
      name: "Head",
      entry: "./components/Head/Head-client.ts",
      server_entry: "./components/Head/Head-server.ts",
    },
    {
      name: "clientOnly",
      entry: "./helpers/clientOnly.tsx",
    },
    {
      name: "vite",
      entry: "./vite-plugin-vike-solid.ts",
    },
  ],
};
export default defineConfig(async (config) => {
  const parsed_data = parsePresetOptions(preset_options);
  console.log(parsed_data);

  for (const entry of parsed_data.entries) {
    const filename = normalize(entry.options.entry).split(".")[0]!;
    const filename_server =
      typeof entry.options.server_entry === "string" ? normalize(entry.options.server_entry).split(".")[0]! : undefined;
    entry.exports = {
      main: filename,
      dev: entry.exports.dev.replace(entry.filename, filename),
      server: entry.exports.server.replace(entry.filename, filename_server ?? filename),
    };
    entry.paths = {
      main: normalizeFilepath(join(parsed_data.out_dir, entry.exports.main)),
      dev: normalizeFilepath(join(parsed_data.out_dir, entry.exports.dev)),
      server: normalizeFilepath(join(parsed_data.out_dir, entry.exports.server)),
    };
  }

  return generateTsupOptions(parsed_data).map((c) => ({
    ...c,
    external: [...(c.external ?? []), "vike"],
  }));
});
