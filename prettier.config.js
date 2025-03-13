module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxSingleQuote: false,
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['**/*.css', '**/*.scss'],
      options: {
        printWidth: 120,
      },
    },
  ],
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
};
