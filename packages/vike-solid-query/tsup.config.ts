import { join, normalize } from "node:path";
import { defineConfig } from "tsup";
import { type PresetOptions, generateTsupOptions, normalizeFilepath, parsePresetOptions } from "tsup-preset-solid";

const preset_options: PresetOptions = {
  entries: [
    {
      entry: "./src/index.ts",
      server_entry: true,
    },
    {
      name: "config",
      entry: "./integration/+config.ts",
    },
    {
      name: "__internal/integration/Wrapper",
      entry: "./integration/Wrapper.tsx",
    },
  ],
};
export default defineConfig(async (config) => {
  const parsed_data = parsePresetOptions(preset_options);
  console.log(parsed_data);

  for (const entry of parsed_data.entries) {
    const filename = normalize(entry.options.entry).split(".")[0]!;
    entry.exports = {
      main: filename,
      dev: entry.exports.dev.replace(entry.filename, filename),
      server: entry.exports.server.replace(entry.filename, filename),
    };
    entry.paths = {
      main: normalizeFilepath(join(parsed_data.out_dir, entry.exports.main)),
      dev: normalizeFilepath(join(parsed_data.out_dir, entry.exports.dev)),
      server: normalizeFilepath(join(parsed_data.out_dir, entry.exports.server)),
    };
  }

  return generateTsupOptions(parsed_data);
});
