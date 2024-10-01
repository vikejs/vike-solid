import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['**/dist/']
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/no-unsafe-function-type': 0,
      '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }]
    }
  }
)
