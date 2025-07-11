<template>
  <div class="p-2 shadow-sm flex items-center h-[50px] box-border">
    <div class="mr-4" @click="appStore.isCollapse = !appStore.isCollapse">
      <Fold v-if="!appStore.isCollapse" class="w-6 cursor-pointer"></Fold>
      <Expand v-else class="w-6 cursor-pointer"></Expand>
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in appStore.breadcrumbs"
        :key="item.path"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
  <div class="py-1 shadow-sm">
    <Tag
      :nagTags="appStore.navTags"
      @close="handleClose"
      @openMenu="handleOpenMenu"
      #default="{ item, currentPath, index }"
    >
      <teleport to="body">
        <TagView
          v-if="isTagView && nowClickIndex === index"
          :style="tagViewStyle"
          @refreshTag="refreshTag(item)"
          @closeCur="closeCurrent(index, item.path, currentPath)"
          @closeOtherTags="closeOtherTags(item)"
          @closeAllTags="closeAllTags"
        />
      </teleport>
    </Tag>
  </div>
</template>
<script setup lang="ts">
import useHome from "@/store";
import Tag from "./components/Tag.vue";
import TagView from "./components/TagView.vue";
import { type NavTag } from "@/store/types";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const appStore = useHome();
const router = useRouter();
const route = useRoute();
const handleClose = (index: number, path: string, currentPath: string) => {
  appStore.navTags.splice(index, 1);
  const length = appStore.navTags.length;
  //没用tag标签跳转首页
  if (!length) {
    router.replace("/index");
  }
  //如果关闭的是当前页面则跳转到上一个tags页面
  if (path === currentPath) {
    length && router.replace(appStore.navTags.splice(-1)[0].path);
  }
};

const tagViewStyle = ref({});
const isTagView = ref(false);
const nowClickIndex = ref();
const listener = () => {
  isTagView.value = false;
  document.removeEventListener("click", listener);
};
const handleOpenMenu = (e: any, index: number) => {
  isTagView.value = true;
  document.addEventListener("click", listener);
  tagViewStyle.value = {
    left: e.clientX + "px",
    top: e.clientY + "px",
  };
  //记录当前点击的tag索引
  nowClickIndex.value = index;
};
const refreshTag = (item: NavTag) => {
  router.push({
    path: "/redirect" + item.fullPath,
    query: route.query,
  });
};
const closeCurrent = (index: number, path: string, currentPath: string) => {
  appStore.navTags.splice(index, 1);

  if (path === currentPath) {
    const length = appStore.navTags.length;
    if (length) {
      router.push(appStore.navTags[length - 1].path);
    } else {
      router.push("/");
    }
  }
};
const closeOtherTags = (item: NavTag) => {
  appStore.$patch({
    navTags: [item],
  });
  router.push(item.path);
};
const closeAllTags = () => {
  appStore.$patch({
    navTags: [],
  });
  router.push("/");
};
</script>
