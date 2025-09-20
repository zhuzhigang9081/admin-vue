<template>
  <div>
    <el-form :inline="true" :model="queryForm">
      <el-form-item label="菜单名称" class="w-[240px]">
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
        <el-button type="primary" icon="Search" @click="getMenuList">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-row class="mb-4">
      <el-button type="primary" icon="Plus" plain @click="handleAdd">
        新增
      </el-button>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="title" label="菜单名称" />
      <el-table-column prop="order_num" label="排序" />
      <el-table-column prop="path" label="路由" />
      <el-table-column prop="permission" label="权限字段" />
      <el-table-column prop="component" label="组件路径" />
      <el-table-column prop="icon" label="图标" width="80">
        <template #default="{ row }">
          <component
            class="w-[20px] mr-2 ml-1"
            v-if="row.icon"
            :is="row.icon"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        :formatter="formatTableDate"
      />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template #default="{ row }">
          <el-link type="primary" icon="Plus" class="mr-1">新增</el-link>
          <el-link type="primary" icon="Edit" class="mr-1">编辑</el-link>
          <el-link type="danger" icon="Delete" class="ml-1">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { type queryForm } from "./type";
import { type MenuList } from "@/store/types/index";
import { formatTableDate } from "@/utils/format";
import { FindMenuListDto } from "@/api/menu/types/menu.dto";
import {
  getMenuListApi,
  createMenuApi,
  updateMenuApi,
  deleteMenuApi
} from "@/api/menu";

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

const getMenuList = async () => {
  const { data } = await getMenuListApi(queryForm as FindMenuListDto);
  tableData.value = data;
};
onMounted(() => {
  getMenuList();
});

const handleAdd = () => {};
</script>
