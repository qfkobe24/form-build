module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],

  // required to lint *.vue files
  plugins: [
    '@typescript-eslint',
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // 函数圆括号之前不要空格 foo() {}
    'space-before-function-paren': 0,
    quotes: [0], // 引号类型 `` ' ''
    'no-multiple-empty-lines': [2, {
      max: 2
    }],
    'no-trailing-spaces': 0,
    'no-mixed-operators': 0,
    'no-eval': 0,
    eqeqeq: 0,
    indent: ['warn', 2],
    'comma-dangle': [
      'off',
      {
        objects: 'never',
        arrays: 'never',
        functions: 'never'
      }
    ],
    'no-empty': 'warn',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/quotes': [
      'warn',
      'single'
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        accessibility: 'no-public'
      }
    ],
    '@typescript-eslint/semi': [
      'off',
      'always'
    ]
  }
}
