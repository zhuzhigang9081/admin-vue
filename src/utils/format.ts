import dayjs from 'dayjs'

//配合el-table-column的formatter使用
export const formatTableDate = (_row: any, _column: any, cellValue: string) => {
  if (!cellValue) return ''
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
}