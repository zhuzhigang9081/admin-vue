import { createWebHashHistory, createWebHistory,createRouter } from 'vue-router'

import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;