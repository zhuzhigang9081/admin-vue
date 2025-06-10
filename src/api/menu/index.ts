import request from '@/utils/http/index'
import { menuDto } from './types/menu.dto'

export const getInfo = (data: menuDto) => {
    return request({
        url: '/menu/getInfo',
        data,
        method: 'post'
    })
}