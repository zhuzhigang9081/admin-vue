/**
 * 处理路由路径
 * @param path 路由路径
 * @returns 处理后的路由路径
 */

export const dealRoutePath = (path: string) => {
    if (!path) return ''
    const pathArr = path.split('/')
    return pathArr.slice(-1)[0]
}