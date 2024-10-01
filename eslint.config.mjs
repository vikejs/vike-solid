import pluginTypescript from 'typescript-eslint'
import pluginSolid from 'eslint-plugin-solid/configs/typescript'

export default pluginTypescript.config(
  {
    ignores: ['**/dist/']
  },
  ...pluginTypescript.configs.recommended,
  pluginSolid,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/no-unsafe-function-type': 0,
      '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }]
    }
  }
)
