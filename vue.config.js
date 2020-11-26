const CopyWebpackPlugin = require('copy-webpack-plugin')
const isLib = process.argv[4] === 'lib'

module.exports = {
  parallel: false,
  productionSourceMap: false,
  configureWebpack: config => {
    if (isLib) {
      config.externals = {
        "element-ui": {
          commonjs: 'element-ui',
          commonjs2: 'element-ui',
          amd: 'element-ui',
          root: 'ELEMENT'
        },
        // vue: "vue",
        "core-js": "core-js",
        vue: {
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue',
          root: 'Vue'
        }
      }
    } else {
      config.resolve.alias.vue$ = 'vue/dist/vue.esm.js'
    }
  },
  css: {
    extract: false
  },
  devServer: {
    port: 9090
  }
};
