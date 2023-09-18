module.exports = {
  'extends': [
    'eslintx',
    'plugin:vue/vue3-essential'
  ],
  'env': {
    'vue/setup-compiler-macros': true
  },
  'rules': {
    'vue/multi-word-component-names': 0
  }
}