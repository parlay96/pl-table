# 虚拟滚动


## 表格
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html
 <span slot="footer" class="dialog-footer">
          <f-button @click="clearSelection">清除选中</f-button>
          <f-button @click="setData(2)">变化数据为2条</f-button>
          <f-button @click="setData(1000)">变化数据为1000条</f-button>
  </span>
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
```
:::

## 测试1
:::demo pl-table
```html

```
:::

## 测试2
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html

```
:::

## 测试3
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html

```
:::

## 测试4
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html

```
:::

## 测试5
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html

```
:::



