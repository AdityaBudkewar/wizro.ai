import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import prettier from 'eslint-plugin-prettier';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'vite.config.*',
      'eslint.config.js',
      '*.config.*',
      'src/components/ui',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      sourceType: 'module',
    },

    plugins: {
      import: importPlugin,
      n: nPlugin,
      prettier,
      'sort-keys-fix': sortKeysFix, // ✅ REGISTER the plugin here
    },

    rules: {
      // ---------- Core ESLint rules ----------
      ...js.configs.all.rules,

      // ---------- Node.js rules ----------
      ...nPlugin.configs['flat/all'].rules,

      // ---------- Import plugin rules ----------
      ...importPlugin.configs.recommended.rules,
      'block-scoped-var': 'error',

      'consistent-return': 'error',

      curly: 'error',

      'default-case': 'error',

      eqeqeq: ['error', 'always'],

      'func-names': ['error', 'always'],

      // ---------- AI-style detection heuristics ----------
      'id-blacklist': ['error', 'foo', 'bar', 'item', 'temp'],

      'id-length': [
        'error',
        { exceptions: ['fs', 'i', 'j', 'k'], min: 3, properties: 'always' },
      ],

      'import/order': [
        'error',
        {
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],

      'max-len': [
        'error',
        {
          code: 120,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
        },
      ],

      'n/no-process-env': 'off',

      'new-cap': [
        'error',
        { capIsNew: false, newIsCap: true, properties: false },
      ],

      // ---------- Custom strict rules ----------
      'no-console': 'error',

      'no-empty-function': 'error',

      'no-magic-numbers': [
        'error',
        {
          detectObjects: true,
          ignore: [0, 1, -1, 1000, -4, 200, 500, 404, 400, 409, 401, 403],
        },
      ],

      'no-param-reassign': 'error',

      'no-redeclare': 'error',

      'no-shadow': 'error',

      'no-ternary': 'off',

      'no-undef-init': 'error',

      'no-unused-vars': [
        'error',
        { args: 'all', argsIgnorePattern: '^_', ignoreRestSiblings: false },
      ],

      'no-var': 'error',

      'one-var': 'off',

      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'const' },
      ],

      'prefer-arrow-callback': 'error',

      'prefer-const': 'error',

      // ---------- Prettier formatting ----------
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
        },
      ],

      // Disable conflicting rules
      'sort-imports': 'off',

      'sort-keys': 'off',

      // ✅ Enable sort-keys-fix plugin rule (auto-fix object keys)
      'sort-keys-fix/sort-keys-fix': [
        'error',
        'asc',
        { caseSensitive: false, natural: true },
      ],

      'sort-vars': 'off',
    },
  },
];
