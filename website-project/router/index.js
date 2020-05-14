import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)


const router = new Router({
    routes,
    mode: 'hash'
})

router.beforeEach((to, from, next) => {
  next()
  //todo 500和404
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
