module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: [
      // 单引号
      'error',
      'single'
    ],
    semi: [
      // 不使用分号
      'error',
      'never'
    ],
    'no-debugger': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 0, // 禁用any提示
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-extra-semi': 0,
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }], // 允许空的箭头函数
    '@typescript-eslint/ban-ts-comment': 0, // 禁用@ts-nocheck提示
    '@typescript-eslint/no-non-null-assertion': 0
  },
  settings: {
    react: {
      version: '17.0.3'
    }
  }
}
