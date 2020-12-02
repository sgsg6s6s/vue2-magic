import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: '首页',
    alias: '/',
    component: Home
  },
  {
    path: '/slot',
    name: '插槽',
    component: () => import('../views/SecondaryFrame.vue'),
    children: [
      {
        path: 'named-slot',
        alias: '',
        name: '具名插槽',
        component: () => import(/* webpackChunkName: "slot" */ '@/pages/slot/NamedSlot.vue'),
      },
      {
        path: 'scoped-slot',
        name: '作用域插槽',
        component: () => import(/* webpackChunkName: "slot" */ '@/pages/slot/ScopedSlot.vue'),
      },
    ]
  },
  {
    path: '/dynamicCSS',
    name: '数据响应CSS',
    component: () => import(/* webpackChunkName: "dynamicCSS" */ '../views/SecondaryFrame.vue'),
    children: [
      {
        path: 'reactive-class',
        alias: '',
        name: '数据响应class',
        component: () => import('@/pages/dynamicCSS/CssClass.vue'),
      },
      {
        path: 'reactive-style',
        name: '数据响应style',
        component: () => import('@/pages/dynamicCSS/CssStyle.vue'),
      },
    ]
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: () => import(/* webpackChunkName: "vuex" */ '../views/SecondaryFrame.vue'),
    children: [
      {
        path: 'vuex-using',
        alias: '',
        name: 'vuex',
        component: () => import('@/pages/vuex/VuexUsing.vue'),
      }
    ]
  },
  {
    path: '/router',
    name: '路由',
    component: () => import(/* webpackChunkName: "router" */ '../views/SecondaryFrame.vue'),
    children: [
      {
        path: 'router-hook',
        alias: '',
        name: '路由钩子',
        component: () => import('@/pages/router/RouterHook.vue'),
      },
      {
        path: 'router-params',
        name: '路由传参',
        component: () => import('@/pages/router/RouterParams.vue'),
      },
    ]
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const { path, matched } = to
  const lastRoute = matched[matched.length - 1]
  console.info('aa', path, matched)
  if (path == '/' || path == '') {
    next('/home')
  } if (path != lastRoute.path) {
    next(lastRoute.path)
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  console.info(to, from, router.getMatchedComponents(to.path))
})
