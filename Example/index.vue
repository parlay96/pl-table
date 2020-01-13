<template>
  <!-- 使用 useVirtual 属性开启虚拟滚动 使用虚拟滚动时，必须要固定表格高度和行高 -->
  <!-- 1. 使用格式外层必须包含一层父级元素，且必须设置高度 2. this.$refs.plTable.setHeight() // 当窗口高度变化或者外层高度变化，就调用该方法 -->
  <div style="height: 100%;width: 100%;overflow: auto">
    <div style="color:red;">pl-table在线预览，更多玩法请看文档哦，欢迎Star</div>
    <span slot="footer" class="dialog-footer">
          <el-button @click="clearSelection">清除选中</el-button>
          <el-button @click="setData(2)">变化数据为2条</el-button>
          <el-button @click="setData(1000)">变化数据为1000条</el-button>
      </span>
    <p style="color: red">我是Y轴虚拟</p>
    <div style="height: 400px;width: 100%">
      <!--<pl-table :datas="tableData" height="400" useVirtual
      注意点： 表格插件并不需要height属性字段(跟ele不同)，因为涉及分页组件。里面会去计算高度，只需要父级外层设置高度即可
      row-height属性很重要 请看表格属性列表
      -->
      <pl-table :datas="data.tableData"
                ref="plTable"
                big-data-checkbox
                fixed-columns-roll
                header-drag-style
                show-summary
                :total-option="[{ label: '地址' }]"
                use-virtual
                :row-height="50">
        <template slot="empty">
          没有查询到符合条件的记录
        </template>
        <pl-table-column type="selection" width="55"/>
        <pl-table-column type="index" width="100" fixed/>
        <!--show-overflow-tooltip属性代表超出则内容部分给出提示框-->
        <pl-table-column
          v-for="item in columns"
          :key="item.id"
          :resizable="item.resizable"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :prop="item.prop"
          :label="item.label"
          :fixed="item.fixed"
          :width="item.width"/>
      </pl-table>
    </div>
    <p style="margin-top: 20px;color: red">我是X + Y轴同时虚拟</p>
    <div style="height:400px">
      <plx-table-grid :datas="data.tableData"  ref="plTable2">
        <plx-table-column type="selection" width="55" fixed="left"/>
        <plx-table-column type="index" width="100" fixed="left"/>
        <plx-table-column
          v-for="item in columns2"
          :key="item.id"
          :resizable="item.resizable"
          :prop="item.prop"
          :label="item.label"
          :fixed="item.fixed"
          :width="item.width"/>
      </plx-table-grid>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {prop: 'date', label: '日期', width: 120},
          {prop: 'address', label: '地址', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '噜噜噜', width: 230, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '地址', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '挖挖掘机挖掘机挖掘机掘机', width: 100},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '噜噜噜', width: 230, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '地址', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '挖挖掘机挖掘机挖掘机掘机', width: 100},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '噜噜噜', width: 230, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true}
        ],
        columns2: Array.from({ length: 500 }, (_, idx) => ({
          prop: 'address', label: '地址' + idx, width: 200, showOverflow: true, sortable: true, fixed: ''
        })),
        data: {
          tableData:Array.from({ length: 10000 }, (_, idx) => ({
            id: idx + 1,
            date: '2016-05-03',
            name: 1,
            ab: '欢迎使用pl-table',
            address: 1 + idx
          }))
        }
      }
    },
    mounted () {
    },
    methods: {
      clearSelection () {
        this.$refs.plTable.clearSelection()
        this.$refs.plTable2.clearSelection()
      },
      setData (num) {
        this.data.tableData = Array.from({ length: num }, (_, idx) => ({
          id: idx + 1,
          date: '2016-05-03',
          name: 1,
          ab: '欢迎使用pl-table',
          address: 1 + idx
        }))
      }
    }
  }
</script>
<style>
  .dsada {
    background-color: red;
  }
  .el-input__inner {
    height: 25px !important;
  }
  body, html {
    overflow: auto;
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
</style>
