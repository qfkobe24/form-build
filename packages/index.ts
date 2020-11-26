import formBuild from './components/form.vue'
import { InstallOptions, AnyObject } from './types'
import { initConfigByUI } from './utils/components-config-map'

const install = function (Vue: any, options?: InstallOptions) {
  const { UIplugin, UIcomponents, UIname }: InstallOptions = 
    options as InstallOptions
  
    if (UIplugin) { // 全局注册
      Vue.use(UIplugin)
    } else if (UIcomponents && UIcomponents.length) { // 按需注册
      UIcomponents.forEach(compObj => {
        Vue.component(compObj.name, compObj)
      })
    }

    // 根据ui，初始化配置
    initConfigByUI(UIname)
    Vue.prototype.$currentUIName = UIname
    Vue.component('form-build', formBuild)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  let UIname = ''
  // 判断当前UI
  if ((window as any).ELEMENT) {
    UIname = 'element-ui'
  } else if ((window as any).vant) {
    UIname = 'vant'
  }

  install(window.Vue,  { UIname });
}

export default {
  install,
  formBuild
}
