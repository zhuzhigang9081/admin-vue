<template>
  <div>
    <div class="zhangsan text-3xl font-bold underline  w-20 h-20 bg-red-600 !text-gray-500">nihao </div>
    <div>
      <div style="font-size: 20px">
        <!-- 由于SVG图标默认不携带任何属性 -->
        <!-- 你需要直接提供它们 -->
        <Edit style="width: 1em; height: 1em; margin-right: 8px" />
        <Share style="width: 1em; height: 1em; margin-right: 8px" />
        <Delete style="width: 1em; height: 1em; margin-right: 8px" />
        <Search style="width: 1em; height: 1em; margin-right: 8px" />
      </div>
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
    </div>
  </div>
  <!-- <el-table-v2 :columns="columns" :data="data" :width="700" :height="400" fixed /> -->
</template>


<script setup lang="ts">
const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }))

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    )
  })

const columns = generateColumns(10)
const data = generateData(columns, 1000)
</script>


<style scoped lang="less"></style>