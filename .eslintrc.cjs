module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // 0: no warning
    // 1: warning, fix optional
    // 2: error, must fix
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 'off',
    'consistent-return': 0,
    'no-debugger': 1,
    'no-console': 1,
    'padding-line-between-statements': [
      2,
      // Always require blank lines after import, except between imports
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      // Always require blank lines before and after every sequence of variable declarations and export
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let', 'var', 'export'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var', 'export'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var', 'export'],
        next: ['const', 'let', 'var', 'export'],
      },
      // Always require blank lines before return statements
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    'jsx-quotes': [2, 'prefer-double'],
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-multiple-empty-lines': [2, { max: 1 }],

    //// '@typescript-eslint' plugin
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/default-param-last': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }],
    '@typescript-eslint/naming-convention': [
      // these are taken straight from the airbnb-eslint-typescript config
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        // except for this one
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/sort-type-constituents': 2,

    // prettier extension
    'prettier/prettier': [2, { singleQuote: true }],
  },
};
