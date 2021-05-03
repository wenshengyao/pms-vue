<template>
  <el-card class="box-card">
    <el-table :data="tableData" :border="border" :height="height" :width="width" ref="defaultTableRef">
      <!-- 是否有多选 -->
      <el-table-column v-if="multiSelect" type="selection" width="55"></el-table-column>
      <!-- 索引列 -->
      <el-table-column v-if="index" type="index" :index="1" label="序号" width="50"></el-table-column>
      <template v-for="(item,key) in tableColumns" :key="key">
        <!-- 表格的列展示 特殊情况处理 比如要输入框 显示图片 -->
        <el-table-column v-if="item.hasTemplate" :prop="item.value" :label="item.name">
          <template v-slot:default="scope">
            <!-- 比如要输入框 显示图片等等 自己定义 -->
            <slot :name="'col-'+item.value" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!--普通文本-->
        <el-table-column v-if="!item.hasTemplate" :prop="item.value" :label="item.name"></el-table-column>
      </template>
      <!--操作列-->
      <el-table-column label="操作" v-if="operation">
        <template v-slot:default="scope">
          <slot :name="'col-operation'" :data="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <!--分页区域-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="queryInfo.pageList"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "defaultTable",
  data() {
    return {
      query: {pageNum: 1, pageSize: 10, pageList: [10, 20, 50, 100], pageable: 1}
    }
  },
  created() {
    this.handlePageInfo()
  },
  methods: {
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.$emit("pageChange", this.queryInfo);
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.$emit("pageChange", this.queryInfo);
    },
    handlePageInfo() {
      if (JSON.stringify(this.queryInfo) == '{}') {
        this.queryInfo.pageNum = this.query.pageNum
        this.queryInfo.pageSize = this.query.pageSize
        this.queryInfo.pageable = this.query.pageable
      }
      this.$emit("pageChange", this.queryInfo);
    }
  },
  //父组件传递的参数
  props: {
    tableData: {type: Array, default: () => []},        //列表数据
    height: {type: Number, default: window.innerHeight - 120 - 250},
    width: {type: String, default: '100%'},
    border: {type: Boolean, default: true},               //边界
    index: {type: Boolean, default: true},                //索引列
    multiSelect: {type: Boolean, default: false},         //多选框
    tableColumns: {type: Array, default: () => []},       //列表表头
    queryInfo: {type: Object, default: {}},
    total: {type: Number, default: 0},
    operation: {type: Boolean, default: true},
  },
  //声明调用的方法
  emits: ["pageChange"],
}
</script>

<style scoped>

</style>