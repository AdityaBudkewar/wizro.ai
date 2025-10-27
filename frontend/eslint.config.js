import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  // ------------------ Ignore patterns ------------------
  {
    ignores: ['node_modules', 'dist', 'build', 'vite.config.*', 'eslint.config.js', '*.config.*', 'src/components/ui'],
  },

  // ------------------ Frontend / React ------------------
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'jsx-a11y': a11yPlugin,
      prettier,
      import: importPlugin,
      'unused-imports': unusedImports,
    },

    rules: {
      // ---------- Base JS ----------
      ...js.configs.recommended.rules,

      // ---------- React ----------
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...a11yPlugin.configs.recommended.rules,

      // ---------- Import plugin ----------
      ...importPlugin.configs.recommended.rules,
      'sort-imports': 'off',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'error',

      // ---------- Prettier (strict) ----------
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'all',
          printWidth: 120,
          endOfLine: 'auto',
        },
      ],

      // ---------- Unused imports/vars ----------
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // ---------- Common strict rules ----------
      'no-console': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-empty-function': 'error',
      'no-undef-init': 'error',
      // 'no-magic-numbers': ['error', { ignore: [0, 1, -1, 100], detectObjects: true }],
      'consistent-return': 'error',
      curly: 'error',
      'block-scoped-var': 'error',
      'no-param-reassign': 'error',
      'no-redeclare': 'error',
      'no-shadow': 'error',
      'default-case': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      semi: ['error', 'always'],

      // ---------- Variable naming ----------
      'id-length': ['error', { min: 3, properties: 'always', exceptions: ['cn', 'cx', 'e', 'id', 'i', 'to'] }],
      'id-blacklist': ['error', 'foo', 'bar', 'temp', 'item'],

      // ---------- Readability ----------
      'func-names': ['error', 'always'],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreComments: false,
          ignoreStrings: true, // ignore long className strings
          ignoreTemplateLiterals: true, // also ignore template literals
          ignoreRegExpLiterals: true,
          ignoreUrls: true,
        },
      ],

      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'const', next: '*' },
      ],

      // ---------- React exceptions ----------
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-useless-fragment': 'error',
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@repo/shadcn-ui', './src'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
        },
      },
    },
  },
];
