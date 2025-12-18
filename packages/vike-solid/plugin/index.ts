export { vikeSolidClientOnly }

import type { Plugin } from 'vite'
import { transformCode, type TransformOptions } from './babelTransformer.js'

const skipNonJsFiles = /\.[jt]sx?$/
const skipNodeModules = 'node_modules'
const filterRolldown = {
  id: {
    include: skipNonJsFiles,
    exclude: `**/${skipNodeModules}/**`,
  },
}
const filterFunction = (id: string) => {
  if (id.includes(skipNodeModules)) return false
  if (!skipNonJsFiles.test(id)) return false
  return true
}

// For Solid, we need to handle the different compilation approaches.
// Solid compiles JSX differently than React - it uses a custom JSX transform
// that creates templates and reactive bindings.
const defaultOptions: TransformOptions = {
  rules: [
    // Rule for ClientOnly component wrapper - strip children on server
    {
      env: 'server',
      call: {
        match: {
          // Match any function call where ClientOnly is used
          function: 'ClientOnly',
        },
        remove: { arg: 0, prop: 'children' },
      },
    },
  ],
}

/**
 * Vite plugin that transforms Solid components on server-side:
 * - Strips specified props (e.g., children) from ClientOnly components
 * - Removes unreferenced imports that result from the stripping
 */
function vikeSolidClientOnly() {
  const plugins: Plugin[] = [
    {
      name: 'vike-solid:client-only',
      enforce: 'post',
      applyToEnvironment(environment) {
        return environment.name !== 'client'
      },
      transform: {
        filter: filterRolldown,
        handler(code, id) {
          if (!filterFunction(id)) return null
          return transformCode({ code, id, env: this.environment.name, options: defaultOptions })
        },
      },
    },
  ]

  return plugins
}
