module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@next/next/no-img-element': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', ignoreRestSiblings: true },
        ],
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'return' },
        ],
        curly: 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: null,
            custom: {
              regex: '^I[A-Z]',
              match: false,
            },
          },
        ],
      },
    },
    {
      files: ['*.ts'],
      rules: {
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc',
            },
            groups: [
              ['external', 'builtin'],
              'internal',
              ['parent', 'sibling', 'index'],
            ],
            'newlines-between': 'always',
          },
        ],
        'require-await': ['error'],
        'no-return-await': ['error'],
        camelcase: [
          'error',
          {
            properties: 'never',
            ignoreDestructuring: true,
            ignoreImports: true,
            ignoreGlobals: true,
          },
        ],
        eqeqeq: ['error', 'smart'],
        'no-duplicate-imports': ['error', { includeExports: true }],
        'sort-imports': [
          'error',
          {
            ignoreDeclarationSort: true,
          },
        ],
        'no-console': 'off',
        'no-await-in-loop': 'warn',
      },
    },
  ],
}
