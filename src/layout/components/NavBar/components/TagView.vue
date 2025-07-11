<template>
  <div class="bg-gray-100 width-[100px] fixed cursor-pointer text-[14px] overflow-hidden rounded-md shadow-lg">
    <div
      class="p-1 hover:bg-[#E0E0E0] flex items-center"
      @click="emits('refreshTag')"
    >
    <!-- el-icon组件的作用是包裹图标 利于统一控制颜色,大小,等 -->
      <el-icon><Refresh /></el-icon><span>刷新页面</span>
    </div>
    <div
      class="p-1 hover:bg-[#E0E0E0] flex items-center"
      @click="emits('closeCur')"
    >
      <el-icon><CloseBold /></el-icon><span>关闭当前</span>
    </div>
    <div
      class="p-1 hover:bg-[#E0E0E0] flex items-center"
      @click="emits('closeOtherTags')"
    >
      <el-icon><Close /></el-icon><span>关闭其他</span>
    </div>
    <div
      class="p-1 hover:bg-[#E0E0E0] flex items-center"
      @click="emits('closeAllTags')"
    >
      <el-icon><Close /></el-icon><span>全部关闭</span>
    </div>
  </div>
</template>

<script setup lang="ts">
type Emits = {
  refreshTag: [];
  closeCur: [];
  closeOtherTags: [];
  closeAllTags: [];
};
const emits = defineEmits<Emits>();
</script>

<style></style>
