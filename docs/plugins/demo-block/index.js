'use strict'

const fs = require('fs')

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex }

function logFile (path, content) { 
  fs.writeFile(path, JSON.stringify(content, null, '\t'), { encoding: 'utf-8' }, function (err) {
    if (err) {
      console.log('写入文件报错：', err)
    } else {
      console.log('写入成功！')
    }
  }) 
}

function injectVar (index, str) {
  return `
  <script>
    window.DEMO_BLOCK_MAP_${index} = "${str}"
  </script>
  `
}

var path = _interopDefault(require('path'))

var OPEN_TYPE = 'container_demo_open'
var END_TYPE = 'container_demo_close'
var CLASS_WRAPPER = 'vuepress-plugin-demo-block__wrapper'
var CLASS_DISPLAY = 'vuepress-plugin-demo-block__display'
var CLASS_CODE = 'vuepress-plugin-demo-block__code'
var CLASS_FOOTER = 'vuepress-plugin-demo-block__footer'
var CLASS_APP = 'vuepress-plugin-demo-block__app'

module.exports = function (options, context) {
  return {
    name: 'vuepress-plugin-demo-block-fb1',
    define: {
      SETTINGS: options.settings || {}
    },
    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
    extendMarkdown: function extendMarkdown(md) {
      md.use(require('markdown-it-container'), 'demo', {
        render: function render(tokens, idx) {
          var item = tokens[idx]
          var nesting = item.nesting
          var info = item.info

          if (nesting === -1) {
            var codeStr
            var codeIndex

            for (var i = idx; i < tokens.length; i--) {
              var _tokens$i = tokens[i]
              var type = _tokens$i.type
              var content = _tokens$i.content
              var _info = _tokens$i.info
              if (type === OPEN_TYPE) break
              if (!content) continue
  
              if (type === 'fence') {
                if (_info !== 'json') {
                  codeIndex = i
                  codeStr = encodeURIComponent(content)
                }
              }
            }

            return `</div>
            ${injectVar(codeIndex, codeStr)}
            <div class="${CLASS_FOOTER}"></div></div>`
          } else if (nesting === 1) {
            var typeStr = ~info.indexOf('react') ? 'react' : ~info.indexOf('vanilla') ? 'vanilla' : 'vue'
            var configStr = ''
            var codeIndex = idx + 1


            for (var i = idx; i < tokens.length; i++) {
              var _tokens$i = tokens[i]
              var type = _tokens$i.type
              var content = _tokens$i.content
              var _info = _tokens$i.info
              if (type === END_TYPE) break
              if (type === 'fence') {
                if (_info === 'json') {
                  configStr = encodeURIComponent(content)
                } else {
                  codeIndex = i
                }
              }
            }
            
            return `<div 
              class="${CLASS_WRAPPER}"  
              style="display: none;"  
              data-type="${typeStr}"  
              data-config="${configStr}"  
              data-code-index="${codeIndex}">    
                <div class="${CLASS_DISPLAY}">     
                  <div class="${CLASS_APP}"></div>
                </div>    
              <div class="${CLASS_CODE}">`
          }
        }
      })
    }
  }
}
