import Vue from 'vue'
import vueRouter from 'vue-router'
import routes from './routes'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(vueRouter)

const router = new vueRouter({ routes, mode: 'history' })

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')
