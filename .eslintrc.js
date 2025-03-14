module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'perfectionist'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'perfectionist/sort-imports': 'error',
    'perfectionist/sort-interfaces': [
      'error',
      {
        type: 'natural',
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'natural',
      },
    ],
    'perfectionist/sort-object-types': [
      'error',
      {
        type: 'natural',
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        type: 'natural',
      },
    ],
    'react/no-unescaped-entities': 'off',
    'sort-keys': 'off',
  },
};
