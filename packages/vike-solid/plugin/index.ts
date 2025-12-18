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

// Solid compiles JSX to createComponent calls.
// We need to strip the children prop from createComponent(ClientOnly, {...}) calls.
const defaultOptions: TransformOptions = {
  rules: [
    {
      env: 'server',
      call: {
        match: {
          function: 'import:solid-js/web:createComponent',
          args: { 0: 'ClientOnly' },
        },
        remove: { arg: 1, prop: 'children' },
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
        async handler(code, id) {
          if (!filterFunction(id)) return null
          return await transformCode({ code, id, env: this.environment.name, options: defaultOptions })
        },
      },
    },
  ]

  return plugins
}
