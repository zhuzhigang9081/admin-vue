<template>
  <div class="app_main">
    <router-view v-slot="{ Component, route }">
        <!-- {{ appStore.cacheViews }} -->
      <Transition name="fade" mode="out-in">
        <keep-alive :include="appStore.cacheViews">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </Transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "@/store";
const appStore = useAppStore();
</script>
<style lang="less">
.app_main {
  padding: 10px;

  .fade-enter-active {
    transition: all 0.3s;
  }

  .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter-from {
    opacity: 0;
  }

  .fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
}
</style>
