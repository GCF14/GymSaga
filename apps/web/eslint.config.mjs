import baseConfig from '../../eslint.config.mjs';
import nextConfig from 'eslint-config-next';

export default [
  ...baseConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['.next/**/*', 'public/*'],
    rules: {
      ...nextConfig.rules,
      '@next/next/no-html-link-for-pages': ['error', 'apps/web/pages'],
      'semi': ['error', 'always'],
      'no-trailing-spaces': 'error',
      '@nx/enforce-module-boundaries': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@gymsaga/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '../**',
              group: 'parent',
              position: 'before'
            },
            {
              pattern: './**',
              group: 'sibling',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    },
    env: {
      jest: true
    }
  }
];