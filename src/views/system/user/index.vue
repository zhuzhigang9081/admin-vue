<template>
  <div>
    用户管理 --{{ count }}
    <div>
      <el-button type="primary" @click="count++" v-hasPermission="'sys:menu:list'"> 点击增加 </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref ,getCurrentInstance} from "vue";
import useAppStore from "@/store/index";
const appStore = useAppStore();
console.log(appStore.permissions,'1')
defineOptions({
  name: "User",
});
const instance = getCurrentInstance();
console.log(instance?.type);
const count = ref(0);
</script>
