<template>
  <div class="card-box homeModule" ref="homeModule">
    <plTable :datas="tableData"
             :dialog-data="myTableHeader"
             ref="plTable"
             :show-summary="true"
             :count-height-time="300"
             :pt-total="50"
             :total-option="totalOptionData"
             @handlePageSize="handlePageSize"
             @header-dragend="headerDragend"
             @handleSelectionChange="handleSelectionChange"
             @show-field="showField">
      <el-table-column type="selection"
                       width="55"
                       align="center"
                       fixed/>
      <el-table-column prop="date" label="日期" fixed/>
      <el-table-column
        prop="name"
        label="姓名"
        fixed
      />
      <el-table-column
        prop="num"
        width="220"
        label="数量"
        sortable
        fixed
      />
      <el-table-column
        prop="jine"
        width="220"
        label="金额"
      />
      <el-table-column
        prop="address"
        width="220"
        label="地址"
      />
      <el-table-column
        prop="date"
        label="日期"
        :resizable="false"
      />
      <el-table-column
        fixed="right"
        style="bottom: 9px"
        :resizable="false"
        width="50">
        <template slot="header" slot-scope="scope">
          <i class="iconshaixuan iconfont" @click="clicks"/>
        </template>
        <template slot-scope="scope">
          <table-menus :row="scope.row" :data="menusData" @command="commands"/>
        </template>
      </el-table-column>
    </plTable>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import plTable from '../../../publicComponent/pl-table/plTable'
  import tableMenus from '../../../publicComponent/pl-tableMenus'
  @Component({components: { plTable, tableMenus }})
  export default class Index extends Vue {
    tableData = []
    myTableHeader = []
    menusData = [
      {icon: 'iconxiangqing', name: '详情'},
      {icon: 'iconxiugai', name: '修改'},
      {icon: 'iconshanchu', name: '删除'}
    ]
    // 需要合计的选项
    totalOptionData = [{label: '金额', unit: '元'}]
    mounted () {
      this.tableData = [
        {
          date: '2016-05-021',
          name: '王小虎',
          num: 100,
          id: '4',
          jine: 50,
          address: '上海市普路上海市普陀区金沙江路18 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          num: 10005.3,
          id: '5',
          jine: 500,
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-021',
          name: '王小虎',
          num: 12,
          id: '4',
          jine: 50,
          address: '上海市普路上海市普陀区金沙江路18 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          num: 123,
          id: '5',
          jine: 500,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-021',
          name: '王小虎',
          num: 32,
          id: '4',
          jine: 50,
          address: '上海市普路上海市普陀区金沙江路18 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          num: 10005.3,
          id: '5',
          jine: 500,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-021',
          name: '王小虎',
          num: 212,
          id: '4',
          jine: 50,
          address: '上海市普路上海市普陀区金沙江路18 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          num: 10,
          id: '5',
          jine: 500,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-021',
          name: '王小虎',
          num: 100,
          id: '4',
          jine: 50,
          address: '上海市普路上海市普陀区金沙江路18 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          num: 9,
          id: '5',
          jine: 500,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-021',
          name: '王小虎',
          num: 502,
          id: '4',
          jine: 50,
          address: '上海市普路上海市普陀区金沙江路18 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          num: 503,
          id: '5',
          jine: 500,
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
      this.myTableHeader = [
        {
          name: '我的',
          state: true,
          disabled: true
        },
        {
          name: '标签',
          state: false
        },
        {
          name: '型号',
          state: false
        },
        {
          name: '客户',
          state: true
        }
      ]
    }
    showField (val) {
      console.log(val)
    }
    clicks () {
      this.$refs.plTable.plDialogOpens() // 打开弹窗
    }
    commands (val) {
      console.log(val)
    }
    handlePageSize (val) {
      console.log(val)
    }
    handleSelectionChange (val) {
      console.log(val)
    }
    headerDragend (newWidth, oldWidth, column, event) {
      console.log(newWidth, oldWidth, column, event)
    }
  }
</script>

<style lang="less">
  .homeModule {
  }
</style>
