import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _17b5fbd3 = () => interopDefault(import('..\\pages\\browse.vue' /* webpackChunkName: "pages/browse" */))
const _ef45f42a = () => interopDefault(import('..\\pages\\mint.vue' /* webpackChunkName: "pages/mint" */))
const _6b5872f0 = () => interopDefault(import('..\\pages\\nscene.js' /* webpackChunkName: "pages/nscene" */))
const _046772ec = () => interopDefault(import('..\\pages\\ooga.js' /* webpackChunkName: "pages/ooga" */))
const _1b713e30 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _4e5670c0 = () => interopDefault(import('..\\pages\\project.vue' /* webpackChunkName: "pages/project" */))
const _585ccacf = () => interopDefault(import('..\\pages\\users.vue' /* webpackChunkName: "pages/users" */))
const _12f2f099 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/browse",
    component: _17b5fbd3,
    name: "browse"
  }, {
    path: "/mint",
    component: _ef45f42a,
    name: "mint"
  }, {
    path: "/nscene",
    component: _6b5872f0,
    name: "nscene"
  }, {
    path: "/ooga",
    component: _046772ec,
    name: "ooga"
  }, {
    path: "/profile",
    component: _1b713e30,
    name: "profile"
  }, {
    path: "/project",
    component: _4e5670c0,
    name: "project"
  }, {
    path: "/users",
    component: _585ccacf,
    name: "users"
  }, {
    path: "/",
    component: _12f2f099,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
