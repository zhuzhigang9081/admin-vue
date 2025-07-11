<template>
  <div class="flex">
    <el-tag
      v-for="(item, index) in tagsProps.nagTags"
      :key="item.name"
      type="primary"
      class="mx-1 cursor-pointer"
      closable
      :effect="currentPath === item.path ? 'dark' : 'light'"
      @click="handleTo(item)"
      @close="handleClose(index, item.path, currentPath)"
      @contextmenu.prevent="tagsEmits('openMenu', $event, index)"
    >
      {{ item.name }}
      <slot :item="item" :currentPath="currentPath" :index="index" />
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { NavTag } from "@/store/types";
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const currentPath = ref(route.path);

type TagsProps = {
  nagTags: NavTag[];
};
const tagsProps = defineProps<TagsProps>();

//初始化给path赋值
watch(
  () => route.path,
  (path) => {
    currentPath.value = path;
  },
  { immediate: true }
);

const handleTo = (item: any) => {
  router.push(item.path);
};
type TagsEmits = {
  close: [index: number, path: string, currentPath: string];
  openMenu: [event: Event, index: number];
};
const tagsEmits = defineEmits<TagsEmits>();
/**
 *
 * @param index 标签索引
 * @param path 标签路径
 * @param currentPath 当前路由路径
 */
const handleClose = (index: number, path: string, currentPath: string) => {
  tagsEmits("close", index, path, currentPath);
};
</script>

<style></style>
