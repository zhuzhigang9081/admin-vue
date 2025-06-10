import { defineStore } from 'pinia'
import { getInfo } from '@/api/menu'
import { AppStoreState } from './types'

export default defineStore('appStore', {
    state: (): AppStoreState => ({
        menuList: [],
        permissions: [],
        isCollapse: false,
    }),
    actions: {
        async getInfo() {
            const { data } = await getInfo({})
            this.menuList = data.menuList
            this.permissions = data.permissions
        }
    }
})