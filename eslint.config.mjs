import nx from '@nx/eslint-plugin';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPerf from 'eslint-plugin-react-perf';
import sonarjs from 'eslint-plugin-sonarjs';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import nextEslint from '@next/eslint-plugin-next';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...tseslint.configs.recommended,
  {
    ignores: [
      '**/dist',
      'node_modules',
      '**/.next/**',
      '**/build/**',
      '**/coverage/**',
      '**/.cache/**',
      '**/public/**',
      '**/*.min.js',
      '**/vendor-chunks/**',
    ],
  },
  {
    files: ['apps/web/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: 'tsconfig.base.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: react,
      'react-hooks': reactHooks,
      'react-perf': reactPerf,
      sonarjs: sonarjs,
      '@tanstack/query': tanstackQuery,
      import: importPlugin,
      prettier: prettier,
      '@next/next': nextEslint,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          project: ['tsconfig.base.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          project: ['tsconfig.base.json'],
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Core rules
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'error',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',

      // NX rules
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [{ sourceTag: '*', onlyDependOnLibsWithTags: ['*'] }],
        },
      ],

      // TanStack Query rules (basic rules only)
      '@tanstack/query/exhaustive-deps': 'error',

      // Code style rules
      'array-bracket-spacing': ['error', 'never'],
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'always'],
      'brace-style': 'error',
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          exports: 'always-multiline',
          functions: 'only-multiline',
          imports: 'always-multiline',
          objects: 'always-multiline',
        },
      ],
      'comma-spacing': ['error', { after: true, before: false }],
      curly: 'error',
      'eol-last': ['error', 'always'],
      eqeqeq: ['error', 'always'],
      'func-names': 'error',

      // Import rules
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      // Built-in sorting rules (no plugin needed)
      'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],

      // Formatting rules
      'jsx-quotes': ['error', 'prefer-double'],
      'key-spacing': ['error', { mode: 'strict' }],
      'max-depth': ['error', 3],
      'max-len': [
        'error',
        {
          code: 125,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignorePattern: 'className=.*', // Allow long className strings for Tailwind
        },
      ],
      'max-params': ['error', 3],
      'no-alert': 'error',
      'no-console': 'warn',
      'no-duplicate-imports': 'error',
      'no-empty-function': 'warn',
      'no-extra-boolean-cast': 'warn',
      'no-extra-semi': 'warn',
      'no-magic-numbers': [
        'error',
        { ignore: [-1, 0, 1, 2, 30, 60, 100, 1000], ignoreArrayIndexes: true },
      ],
      'no-multi-spaces': 'warn',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-plusplus': 'warn',
      'no-trailing-spaces': 'warn',
      'no-unreachable': 'error',
      'no-unused-expressions': 'warn',
      'no-var': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
      ],
      'prefer-const': 'error',

      // Prettier integration - matches your .prettierrc exactly
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          endOfLine: 'auto',
          printWidth: 100,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          useTabs: false,
        },
      ],

      // Quote style (matches Prettier)
      quotes: ['error', 'single', { avoidEscape: true }],

      // React Hooks rules
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // React Performance rules
      'react-perf/jsx-no-new-array-as-prop': 'off',
      'react-perf/jsx-no-new-function-as-prop': 'off',
      'react-perf/jsx-no-new-object-as-prop': 'off',

      // React rules
      'react/display-name': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.ts'] }],
      'react/jsx-handler-names': [
        'error',
        { eventHandlerPrefix: 'handle', eventHandlerPropPrefix: 'on' },
      ],
      'react/jsx-sort-props': [
        'error',
        { callbacksLast: true, ignoreCase: true, reservedFirst: true, shorthandFirst: true },
      ],
      'react/prefer-stateless-function': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/sort-comp': [
        'error',
        {
          order: [
            'type-annotations',
            'static-methods',
            'lifecycle',
            '/^handle.+$/',
            'everything-else',
            'render',
          ],
        },
      ],

      // Semicolon rules (matches Prettier)
      semi: ['error', 'always'],
      'semi-spacing': ['error', { after: true, before: false }],

      // SonarJS rules
      'sonarjs/cognitive-complexity': ['error', 50],

      // Spacing rules
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error',
        { anonymous: 'always', asyncArrow: 'always', named: 'never' },
      ],
      'space-in-parens': ['error', 'never'],
    },
  },
  {
    files: ['apps/api/**/*.{ts,js}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: 'tsconfig.base.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      prettier: prettier,
    },
    rules: {
      // Core rules for API
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'error',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',

      // Import rules
      'import/no-extraneous-dependencies': 'off',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      // Code style
      'no-console': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',

      // Prettier integration
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          endOfLine: 'auto',
          printWidth: 100,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          useTabs: false,
        },
      ],
    },
  },
];
