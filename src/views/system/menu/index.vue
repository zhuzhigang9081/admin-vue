<template>
  <el-form :inline="true" :model="queryForm">
    <el-form-item label="菜单名称">
      <el-input
        v-model="queryForm.title"
        placeholder="请输入菜单名称"
        clearable
      />
    </el-form-item>
    <el-form-item label="状态" class="w-[150px]">
      <el-select v-model="queryForm.status" placeholder="菜单状态" clearable>
        <el-option
          v-for="dick in dickStatus"
          :key="dick.value"
          :label="dick.label"
          :value="dick.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="Search"> 搜索 </el-button>
    </el-form-item>
  </el-form>
  <el-row class="mb-4">
    <el-button type="primary" icon="Plus" plain> 新增 </el-button>
  </el-row>
  <el-table :data="tableData"> </el-table>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { type queryForm } from "./type";
import { type MenuList } from "@/store/types/index";

const queryForm = reactive<queryForm>({
  title: "",
  status: ""
});
const dickStatus = [
  {
    label: "全部",
    value: ""
  },
  {
    label: "启用",
    value: 1
  },
  {
    label: "禁用",
    value: 0
  }
];
const tableData = ref<MenuList[]>([]);
</script>
