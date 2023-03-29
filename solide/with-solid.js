import { cwd } from "node:process";
import { resolve, dirname } from "node:path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { rmSync, readFileSync } from "node:fs";
import { babel } from "@rollup/plugin-babel";

function findClosestPackageJson(start = cwd(), level = 0) {
  try {
    const path = resolve(start, "package.json");
    const content = readFileSync(path, { encoding: "utf8" });
    return JSON.parse(content);
  } catch {
    return level >= 10 ? {} : findClosestPackageJson(dirname(start), level + 1);
  }
}

function processOptions(options) {
  const {
    babelOptions,
    solidOptions,
    ssr,
    external: externalOptions,
  } = options;
  const currentDir = process.cwd();
  const pkg = findClosestPackageJson(currentDir);
  const extensions = [".js", ".ts", ".jsx", ".tsx"];

  const src = options.input || pkg.source;
  if (!src) {
    throw new Error(
      'No input was provided. Please provide an input via the "input" option or via "source" in the package.json'
    );
  }

  const external = [
    ...externalOptions,
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];

  const babelTargets = pkg.browserslist || "last 2 years";

  if (!src) {
    throw new Error(
      "No input source found. You can add it to the `source` property in your `package.json` or feed it into the `input` option in the `withConfig` function."
    );
  }

  const output = {
    format: "esm",
    dir: "dist",
    // sourcemap: true,
  };

  const ssrOptions = ssr
    ? {
        generate: "ssr",
        hydratable: true,
      }
    : {
        generate: "dom",
        hydratable: true,
      };

  return {
    input: src,
    external: [
      "solid-js",
      "solid-js/web",
      "path",
      "express",
      "stream",
      ...external,
    ],
    output,
    plugins: [
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: [
          [
            "solid",
            {
              ...solidOptions,
              ...ssrOptions,
            },
          ],
          "@babel/preset-typescript",
          ["@babel/preset-env", { bugfixes: true, targets: babelTargets }],
        ],
        ...babelOptions,
      }),
      ssr
        ? nodeResolve({
            extensions,
            preferBuiltins: true,
            exportConditions: ["solid", "node"],
          })
        : nodeResolve({ extensions, exportConditions: ["solid"] }),
    ],
  };
}

export default function withSolid(options = {}) {
  rmSync(resolve(cwd(), "dist"), {
    force: true,
    recursive: true,
  });

  return processOptions(options);
}
