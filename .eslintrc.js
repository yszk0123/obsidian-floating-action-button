// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    extraFileExtensions: ['.mjs'],
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'simple-import-sort',
    'typescript-sort-keys',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowAny: false,
        allowNullableBoolean: true,
        allowNullableNumber: false,
        allowNullableObject: false,
        allowNullableString: true,
        allowNumber: false,
        allowString: false,
      },
    ],
    'no-unused-vars': ['off'],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/display-name': 'off',
    'react/jsx-handler-names': ['error', { eventHandlerPrefix: '(handle|on)' }],
    'react/jsx-sort-props': ['error', { callbacksLast: true }],
    'react/prop-types': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': ['error', 'asc'],
  },
  settings: {
    react: {
      version: '17.0.2',
    },
  },
};
