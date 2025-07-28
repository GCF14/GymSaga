import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import nx from '@nx/eslint-plugin';

export default [
  {
    ignores: ['**/*'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@nx': nx,
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...typescript.configs.stylistic.rules,
      
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          shorthandFirst: true,
          callbacksLast: true,
          multiline: 'last',
          reservedFirst: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@nx/enforce-module-boundaries': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['UPPER_CASE', 'snake_case', 'camelCase', 'PascalCase'],
          filter: {
            regex: '[-]',
            match: false,
          },
        },
      ],
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/semi': ['error'],
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];