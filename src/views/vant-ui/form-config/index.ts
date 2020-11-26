/**
 * @description: 获取表单配置
 */

const req = require.context('./', true, /\.config\.js$/)
let cache = []
const requireAll = (r: any) => r.keys().map(r)

cache = requireAll(req)
// 获取组件类型和配置的映射关系
let formConfig: any[] = []
cache.forEach((model: any) => {
  const curConfig = model.default
  formConfig = formConfig.concat(curConfig)
})


export default formConfig
