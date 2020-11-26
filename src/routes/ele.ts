import Vue from 'vue'
import formBuild from '../../packages'
// import formBuild from '../../lib/form-build.umd.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(formBuild, {
  UIname: 'element-ui',
  UIplugin: ElementUI
})

const routes: any[] = [{
  path: '/ele', component: () => import('../views/ele-ui/index.vue')
}]

const req = require.context('../demo/ele-ui', false, /\.vue$/)
const fileNames = req.keys()
const requireAll = (r: any) => r.keys().map(r)

requireAll(req).forEach((item: any, index: number) => {
  routes.push({
    path: '/ele/' + fileNames[index].replace(/(.*\/)*([^.]+).*/ig, '$2'),
    component: item.default
  })
})
export default routes
