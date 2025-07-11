import { type Router, type RouteRecordRaw } from "vue-router";
import useAppStore from "@/store/index";
import { filterRoute } from "@/utils/filterRouters";
import { filterBreadcrumb } from "@/utils/filterBreadcrumb";

export const useHandleRouter = (router: Router) => {
  const whiteList = ["Login"];
  router.beforeEach(async (to, _from, next) => {
    if (whiteList.includes(to.name as string)) {
      next();
      return;
    }

    const appStore = useAppStore();
    //已经获取到菜单直接放行
    if (appStore.menuList.length > 0) {
      console.log(to, "to");
      //处理面包屑,将从to中取出path匹配菜单中的title
      appStore.$patch({
        breadcrumbs: filterBreadcrumb(to.path, appStore.menuList),
      });
      appStore.addTags({
        name: to.meta.title as string,
        path: to.path,
        fullPath: to.fullPath,
      });
      next();
      return;
    }
    //获取菜单路由列表
    try {
      await appStore.getInfo();
      //将后端返回的菜单路由处理成符合vue-router格式的路由
      const routers = filterRoute(appStore.menuList);
      //循环添加路由到父路由Index下
      routers.forEach((route: RouteRecordRaw) => {
        console.log(route, "route");
        router.addRoute("Index", route);
      });
      //添加完需要再次进入路由 不然会白屏
      console.log("路由处理完成", router.getRoutes());
      next({ ...to, replace: true });
    } catch (error) {
      console.error("路由处理出错:", error);
      next({ name: "Login", replace: true });
      //TODO 暂时绕过 ,先写ui
      // next()
    }
  });
};
