module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'json-format'
  ],
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'no-multi-spaces': ['error'],
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
    ],
    'import/no-named-as-default': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/valid-v-slot': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
