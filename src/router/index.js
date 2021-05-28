import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Classify from '@/views/Classify'
import Shopping from '@/views/Shopping'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'classify',
        name: 'Classify',
        component: Classify
      },
      {
        path: 'shopping',
        name: 'Shopping',
        component: Shopping
      },
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '*',
    redirect: '/home/classify'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
