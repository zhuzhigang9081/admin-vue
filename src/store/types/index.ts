export type AppStoreState = {
    menuList: MenuList[]
    isCollapse: boolean
    permissions: string[],
    breadcrumbs: Breadcrumb[],
    navTags: NavTag[]
    cacheViews: string[]
}

export type MenuList = {
    id: number
    parent_id: number
    title: string
    path: string
    component: string
    icon: string
    order_num: number
    status: boolean
    menu_type: 1 | 2 | 3
    children?: MenuList[]
    meta?: {
        title?: string
        cache?: number
        hidden?: boolean    
        name?: string
        status?: boolean
    }
}
export type Breadcrumb = {
    name: string
    path?: string
}

export type NavTag = {
    name: string
    path: string,
    fullPath?: string
}
