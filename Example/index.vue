<template>
  <!-- 使用 useVirtual 属性开启虚拟滚动 使用虚拟滚动时，必须要固定表格高度和行高 -->
  <!-- 1. 使用格式外层必须包含一层父级元素，且必须设置高度 2. this.$refs.plTable.setHeight() // 当窗口高度变化或者外层高度变化，就调用该方法 -->
  <div style="height: 100%;width: 100%">
    <!-- 这个高度同学们别老觉得我写死了，比如：你完全可以动态计算得到父元素高度，减去兄弟节点的高度，得到表格高度，一切依你，当你不设置父级节点高度，默认就是父级节点的高度，那自然就是父级的父级节点高度啦， -->
    <div style="height: 500px;width: 100%">
      <!--<pl-table :datas="tableData" height="400" useVirtual
      注意点： 表格插件并不需要height属性字段(跟ele不同)，因为涉及分页组件。里面会去计算高度，只需要父级外层设置高度即可
      row-height属性很重要 请看表格属性列表
      -->
      <pl-table :datas="tableData"
                big-data-checkbox
                ref="plTable"
                header-drag-style
                use-virtual
                :row-height="50">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {prop: 'date', label: '日期', width: 120},
          {prop: 'address', label: '地址', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '挖掘机', width: 100},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '噜噜噜', width: 230, showOverflowTooltip: true},
          {prop: 'name', label: '姓名', width: 230},
          {prop: 'address', label: '地址', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '挖掘机', width: 100},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '噜噜噜', width: 230, showOverflowTooltip: true},
          {prop: 'address', label: '地址', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '挖掘机', width: 100},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '噜噜噜', width: 230, showOverflowTooltip: true},
          {prop: 'ab', label: '欢迎你啊', width: 200, fixed: 'right', resizable: false},
        ],
        tableData:Array.from({ length: 10000 }, (_, idx) => ({
          idx: idx + 1,
          date: '2016-05-03',
          name: '王小虎',
          ab: '欢迎使用pl-table',
          address: '上海市普陀区金沙江路 1516 弄'
        }))
      }
    }
  }
</script>

<style>
  body, html {
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
</style>
