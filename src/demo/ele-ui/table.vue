<template>
  <div>
    <table-builder ref="table" size="mini" :data="tableData" :columnList="columnList"></table-builder>

    <table-builder-pro ref="tableBuilderPro" size="mini" :data="tableData" :columnList="columnList"  @submitRow="submitRow">
      <template v-slot:operColumn="scope">
        <el-button size="mini" type="primary" @click="edit(scope.row, scope.$index)">修改</el-button>
        <el-button size="mini" @click="del(scope.$index)">删除</el-button>
      </template>
    </table-builder-pro>
  </div>
</template>

<script>
import tableBuilder from '../../../table/components/table-builder.vue'
import tableBuilderPro from '../../../table/components/table-builder-pro.vue'

export default {
  components: {
    tableBuilder,
    tableBuilderPro
  },

  data() {
    const that = this
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],

      columnList: [{
        type: 'index'
      },{
        prop: 'date',
        label: '日期',
        form: {
          component: 'date-picker',
          props: {
            placeholder: '请选择日期'
          }
        }
      }, {
        prop: 'name',
        label: '姓名',
        form: {
          component: 'input'
        }
      }, {
        prop: 'address',
        label: '地址',
        form: {
          component: 'input'
        }
      }]
    }
  },

  methods: {
    edit (row, index) {
      this.$refs.tableBuilderPro.editRow(row, index)
    },

    del (index) {
      this.tableData.splice(index, 1)
    },

    submitRow (model) {
      console.log('提交数据：', model);
      this.$refs.tableBuilderPro.cancalEdit()
    }
  }
}
</script>