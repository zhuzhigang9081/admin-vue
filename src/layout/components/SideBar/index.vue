<template>
  <div class="h-full bg-[#545c64]">
    <div class="h-[50px] flex items-center justify-center text-white px-[10px]">
      <span>fs权限管理系统</span>
    </div>
    <el-scrollbar class="warp-scroll">
      <el-menu
        @select="getPath"
        :collapse="homeStore.isCollapse"
        :unique-opened="true"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo w-[223px] !border-r-0"
        text-color="#fff"
        :default-active="dealRoutePath($route.path)"
      >
        <el-menu-item index="index">
          <!-- 图标组件 -->
          <component class="w-[15px] mr-2 ml-1" is="House" /><span>首页</span>
        </el-menu-item>
        <SideBarItem
          v-for="item in homeStore.menuList"
          :key="item.id!"
          :item="item"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useHome from "@/store";
import { dealRoutePath } from "@/utils/routeUtils";
import SideBarItem from "./components/SideBarItem.vue";
const homeStore = useHome();
const router = useRouter();
const route = useRoute();
const getPath = (_v: any, d: string[]) => {
  console.log(_v, "v");
  console.log(d, "d");
  router.push(`/${d.join("/")}`);
};
onMounted(() => {
  console.log(dealRoutePath(route.path), "dealRoutePath($route.path)");
});
</script>
<style>
.warp-scroll {
  height: calc(100% - 50px);
}
</style>
