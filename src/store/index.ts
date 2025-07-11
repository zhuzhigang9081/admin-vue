import { defineStore } from "pinia";
import { getInfo } from "@/api/menu";
import { type AppStoreState, type NavTag } from "./types";

export default defineStore("appStore", {
  state: (): AppStoreState => ({
    menuList: [],
    permissions: [],
    isCollapse: false,
    breadcrumbs: [],
    navTags: [],
    cacheViews: [],
  }),
  actions: {
    async getInfo() {
      const { data } = await getInfo({});
      this.menuList = data.menuList;
      this.permissions = data.permissions;
    },
    addTags(tag: NavTag) {
      const isRepeat = this.navTags.find((item) => item.name === tag.name);
      const isRedirect = tag.path.includes("/redirect");
      if (!isRepeat && !isRedirect) {
        this.navTags.push({
          name: tag.name,
          path: tag.path,
          fullPath: tag.fullPath,
        });
      }
    },
    //添加缓存路由
    addCacheView(view: string) {
      if (!this.cacheViews.includes(view)) {
        this.cacheViews.push(view);
      }
    },
  },
});
