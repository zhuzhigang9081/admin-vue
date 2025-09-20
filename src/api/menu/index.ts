import request from '@/utils/http/index'
import { FindMenuListDto, CreateMenuDto, UpdateMenuDto } from './types/menu.dto';

export const getInfoApi = () => {
    return request({
        url: '/menu/getInfo',
        method: 'post'
    })
}

export const getMenuListApi = (query: FindMenuListDto) => {
    return request({
        url: '/menu/list',
        method: 'get',
        params:query
    })
}

export const createMenuApi = (data: CreateMenuDto) => {
    return request({
        url: '/menu/createMenu',
        method: 'post',
        data
    })
}

export const updateMenuApi = (data: UpdateMenuDto) => {
    return request({
        url: '/menu/updateMenu',
        method: 'put',
        data
    })
}

export const deleteMenuApi = (menuId: string) => {
    return request({
        url: `/menu/deleteMenu/${menuId}`,
        method: 'delete',
    })
}