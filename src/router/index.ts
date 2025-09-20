import { createWebHashHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { useHandleRouter } from "@/hooks/useHandleRouter";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    redirect: '/index',
    component: () => import(/* webpackChunkName: "index" */ "@/layout/index.vue"),
    children: [
      {
        path: "/index",
        component: () => import("@/views/index.vue"),
        name: "Home",
        meta: { title: "首页" },
      },
      {
        path: "/system/user",
        component: () => import("@/views/system/user/index.vue"),
        meta: { title: "首页" },
      },
      {
        path: "/system/menu",
        component: () => import("@/views/system/menu/index.vue"),
        meta: { title: "首页" },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')

  },
  //用于刷新页面
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views//error/404.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  /**
   * 路由滚动行为
   * @param to 要去的路由
   * @param from 来自哪里的路由
   * @param savedPosition 当使用浏览器的前进或后退按钮时，会包含之前保存的滚动位置。如果不是通过前进或后退按钮导航，该参数为 null。
   * @returns 指定滚动的位置，通常是一个包含 top 和 left 属性的对象。
   */
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})
useHandleRouter(router)
export default router;