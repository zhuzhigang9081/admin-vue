import { type Router, type RouteRecordRaw } from 'vue-router'
import useAppStore from '@/store/index'
import { filterRoute } from '@/utils/filterRouters'

export const useHandleRouter = (router: Router) => {
    const whiteList = ['Login']
    router.beforeEach(async (to, _from, next) => {
        if (whiteList.includes(to.name as string)) {
            next()
            return
        }

        const appStore = useAppStore()
        //已经获取到菜单直接放行
        
        if (appStore.menuList.length > 0) {
            next()
            return
        }
        //获取菜单路由列表
        try {
            await appStore.getInfo();
            //将后端返回的菜单路由处理成符合vue-router格式的路由
            const routers = filterRoute(appStore.menuList);

            //循环添加路由到父路由Index下
            routers.forEach((route: RouteRecordRaw) => {
                router.addRoute("Index", route);
            });
            //添加完需要再次进入路由 不然会白屏
            next({ ...to, replace: true })
            console.log('路由处理完成', router.getRoutes())
        }
        catch (error) {
            console.error('路由处理出错:', error);
            next()
        }
    })
}