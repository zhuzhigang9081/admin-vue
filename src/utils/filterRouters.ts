/**
 * vite 自带的glob方法，用于获取指定路径下的所有文件 相当于webpack的require.context
 * 等于 const modules = { 
 *  '../views/Home/index.vue': () => import('../views/Home/index.vue'),
 * }
*/
const modules = import.meta.glob('../views/**/*.vue')

export const filterRoute = (data: any) => {
    data.forEach((item: any) => {
        if (item.children?.length > 0) {
            delete item.component;
            filterRoute(item.children);
        } else {
            item.component = loadView(item.component);
        }
    });
    return data;
}
//将本地的路由与后端返回的路由进行匹配
const loadView = (view: any) => {
    let res;
    for (const path in modules) {
        const dir = path.split('views/')[1].split('.vue')[0];
        if (dir === view) {
            res = () => modules[path]()
        }
    }
    return res
}