import Vue from 'vue'
import formBuild from '../../packages'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(formBuild, {
  UIname: 'vant',
  UIplugin: Vant
})

const routes: any[] = [{
  path: '/vant', component: () => import('../views/vant-ui/index.vue')
}]

const req = require.context('../demo/vant-ui', true, /\.vue$/)
const fileNames = req.keys()
const requireAll = (r: any) => r.keys().map(r)

requireAll(req).forEach((item: any, index: number) => {
  routes.push({
    path: '/vant/' + fileNames[index].replace(/(.*\/)*([^.]+).*/ig, '$2'),
    component: item.default
  })
})
export default routes
