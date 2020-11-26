import eleUICxt from '../element-ui/utils/get-comp-context'
import vantUICxt from '../vant/utils/get-comp-context'

const contextMap = {
  'element-ui': eleUICxt,
  vant: vantUICxt
}
// 获取组件类型和配置的映射关系
const cpmTypes: string[] = []
const valueMap: any = {}
const valueTypeMap: any = {}
const getRenderConfigMap: any = {}

function initConfigByUI(UIname: string) {
  const req = contextMap[UIname]
  const fileNames = req.keys()

  const requireAll = (r: any) => r.keys().map(r)

  requireAll(req).forEach((item: any, index: number) => {
    const type = fileNames[index].replace(/\.\/(.*)\/index\..*/ig, '$1')
    cpmTypes.push(type)
    valueMap[type] = item.value
    valueTypeMap[type] = item.valueType
    getRenderConfigMap[type] = item.getRenderConfig
  })

  return { valueMap, getRenderConfigMap }
}

export {
  cpmTypes,
  valueMap,
  valueTypeMap,
  getRenderConfigMap,
  
  initConfigByUI
}
