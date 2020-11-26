let routes: any[] = []

if (window.location.pathname.includes('/ele')) {
  routes = require('./ele.ts').default
} else {
  routes = require('./vant.ts').default
}

export default routes
