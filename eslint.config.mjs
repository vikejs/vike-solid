import tseslint from 'typescript-eslint'
import solid from 'eslint-plugin-solid/configs/typescript'

export default tseslint.config(
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ...solid
  },
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
