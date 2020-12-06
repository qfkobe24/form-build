// import Vuep from '../libs/vuep.common'
import '../libs/vuep.css'
// import formBuild from '../../lib/form-build.umd'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant, { Toast, Dialog } from 'vant'
import 'vant/lib/index.css'
let formBuild
export default async ({ Vue, isServer, router }) => {
  if (!isServer) {
    let libs =  await loadLib()
    let Vuep = libs[0].default
    formBuild = libs[1].default
    
    Vue.use(Vuep)
    Vue.use(ElementUI)
    Vue.use(Vant)
    
    Vue.prototype.$dialog = Dialog
    Vue.prototype.$toast = Toast

    listenDocRoute(Vue, router)
  }
}

function loadLib () {
  return Promise.all([
    import('../libs/vuep.common'),
    import('../../lib/form-build.umd')
  ])
}

/**
 * 监听路由跳转，重新注册UI组件
 * @param {*} router 
 */
function listenDocRoute(Vue, router) {
  router.beforeEach((to, from, next) => {
    console.log(formBuild);
    
    if (to.path.includes('demo/playground')) { // 跳转到demo页面啥也不做
    } else if (!to.path.includes('vant')) {
      // 重新注册form-build element UI
      formBuild.install(Vue, { UIname: 'element-ui', UIplugin: ElementUI })
    } else {
      // 重新注册form-build vant UI
      formBuild.install(Vue, { UIname: 'vant', UIplugin: Vant })
    }

    next()
  })
}