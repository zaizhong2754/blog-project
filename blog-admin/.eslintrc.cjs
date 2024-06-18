module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'none',
        endOfLine: 'auto',
        semi: false,
        arrowParens: 'avoid',
        plugins: ['prettier-plugin-tailwindcss']
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
