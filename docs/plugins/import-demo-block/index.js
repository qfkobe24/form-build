/**
 * 专为以下格式设计的demo-block（需要配合@vuepress/register-components使用）：
 * ::: demo
 * <<< @/src/demo/ele-ui/autocomplete.vue
 * :::
 */
const mdContainer = require('markdown-it-container')
const OPEN_TYPE = 'container_demo_open'
const END_TYPE = 'container_demo_close'

module.exports = function (options, context) {
  return {
    extendMarkdown: md => {
      md.use(mdContainer, 'demo', {
        validate(params) {
          return params.trim().match(/^demo\s*(.*)$/)
        },
        render(tokens, idx) {
          const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
          if (tokens[idx].nesting === 1) {
            return `<demo-block>`
          } else {
            let codeStr
            
            for (let i = idx; i < tokens.length; i--) {
              const _tokens$i = tokens[i]
              const type = _tokens$i.type
              const content = _tokens$i.content
              const _info = _tokens$i.info
              if (type === OPEN_TYPE) break
              if (!content) continue
    
              if (type === 'fence') {
                if (_info !== 'json') {
                  codeStr = encodeURIComponent(content)
                }
              }
            }

            // 获取组件名称
            const codeSrc = tokens[idx - 1].type === 'fence' ? tokens[idx - 1].src : ''
            if (codeSrc) {
              let comName = codeSrc.match(/src\/demo\/([\s\S]+).vue$/)
              if (comName) {
                comName = comName[1].replace(/\//g, '-')
                return `<template slot="source"><${comName}></${comName}></template><template slot="source-code">${codeStr}</template></demo-block>`
              }
            }
    
            return `<template slot="source-code">${codeStr}</template></demo-block>`
          }
        }
      })
    }
  }
}
