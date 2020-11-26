// const demoBlock = require('../plugins/demo-block/index.js')
const path = require('path')

module.exports = {
  port: '9093',
  title: 'form-build',
  description: '让表单使用更简单',
  head: [
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }], // cdn不稳定，已转移到本地
    // ['script', { src: 'https://unpkg.com/babel-plugin-transform-vue-jsx@3.7.0/dist/babel-plugin-transform-vue-jsx.min.js' }], // cdn不稳定，已转移到本地
    ['script', { src: '/babel.min.js' }], // cdn不稳定，已转移到本地
    ['script', { src: '/babel-plugin-transform-vue-jsx.min.js' }], // cdn不稳定，已转移到本地
    // ['script', { src: 'https://cdn.rawgit.com/reverland/babel-plugin-transform-vue-jsx/build/dist/babel-plugin-transform-vue-jsx.min.js' }],
    // ['link', { rel: 'stylesheet', href: 'https://lib.baomitu.com/element-ui/2.13.2/theme-chalk/index.css' }],
    // ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vant@2.8/lib/index.css' }],
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js' }],
    // ['script', { src: 'https://lib.baomitu.com/element-ui/2.13.2/index.js' }],
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/vant@2.8/lib/vant.js' }],
    // ['script', { src: 'http://travelminpreprod.bestwehotel.com/static/js/form-build.umd.js' }],
    // ['script', { src: 'https://tripcdn.bestwehotel.com/_nuxt/form-build.umd.js' }],
  ],
  plugins: [
    // ['@vuepress/register-components', {
    //   componentsDir: path.resolve(__dirname, '../../src/demo')
    // }],
    // doc: https://vuepress.github.io/zh/plugins/clean-urls/
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404.html',
      },
    ],
    ['@vuepress/active-header-links'],
    [require('../plugins/demo-block/index.js'), {
      settings: {
      jsLib: [
        'https://lib.baomitu.com/element-ui/2.13.2/index.js',
        'http://travelminpreprod.bestwehotel.com/static/js/form-build.umd.js'
      ],
      cssLib: [
        'https://lib.baomitu.com/element-ui/2.13.2/theme-chalk/index.css'
      ],
      vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js'
    }}]
  ],
  chainWebpack(config) {
    config.resolve.alias.set('vue', 'vue/dist/vue.esm.js')
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN' // 将会被设置为 <html> 的 lang 属性
    }
  },
  // markdown: {
  //   extendMarkdown: demoBlock
  // },
  themeConfig: {
    nav: [
      {text: '指南', link: '/guide/'},
      {text: '配置', link: '/config/'},
      {text: 'UI框架', items: [
        { text: 'ElementUI', link: '/framework/ele-ui/'},
        { text: 'Vant', link: '/framework/vant/'}
      ]},
      {text: 'demo', items: [
        { text: 'ElementUI', link: '/demo/ele-ui/'},
        { text: 'Vant', link: '/demo/vant/'}
      ]}
    ],
    sidebar: {
      '/guide/': [{
        title: '指南',
        collapsable: false,
        children: [
          '',
          'quickstart',
          // 'layout',
          // 'data-manage',
          // 'custom',
          // 'validate',
          // 'search-form'
        ]
      }],
      '/config/': [{
        title: '配置',
        collapsable: false,
        children: [
          ''
        ]
      }],
      '/framework/ele-ui/': [{
        title: '快速上手',
        collapsable: false,
        children: ['', 'install']
      }, {
        title: '内置组件',
        collapsable: false,
        children: ['input', 'autocomplete', 'input-number', 'switch', 'slider', 'select', 'cascader', 'checkbox', 'radio', 'date-picker', 'time-picker', 'time-select', 'upload']
      }],
      '/framework/vant/': [{
        title: '快速上手',
        collapsable: false,
        children: ['', 'install']
      }, {
        title: '内置组件',
        collapsable: false,
        children: ['field', 'checkbox', 'datetime-picker', 'picker', 'radio', 'slider', 'stepper', 'switch']
      }],
      '/demo/ele-ui/': [{
        title: '代码示例',
        collapsable: false,
        children: ['']
      }],
      '/demo/vant/': [{
        title: '代码示例',
        collapsable: false,
        children: ['']
      }]
    },
    smoothScroll: true,
    activeHeaderLinks: true,
    // displayAllHeaders: true,
    // TODO: 需创建索引 https://vuepress.vuejs.org/zh/theme/default-theme-config.html#algolia-%E6%90%9C%E7%B4%A2
    algolia: {
      appId: 'AMKOFURY2Y',
      apiKey: '3d7253f1afc087237e30e34532bc926a',
      indexName: 'formbuild'
    }
  }
}
