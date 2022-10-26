module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [ 'unused-imports' ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  rules: {
    // 'react/jsx-filename-extension': 0
    '@typescript-eslint/ban-ts-comment': 'off',
    "no-unused-vars": "off", // Use typescript-eslint version instead for --fix
    "@typescript-eslint/no-unused-vars": "error",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-console": [ "error", { allow: [ "warn", "error", "debug" ]}]
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        directory: '.'
      }
    },
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true
  }
};
