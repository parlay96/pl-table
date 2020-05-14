<template>
  <!-- 使用 useVirtual 属性开启虚拟滚动 使用虚拟滚动时，必须要固定表格高度和行高 -->
  <div style="height: 100%;width: 100%;overflow: auto">
     <div style="color:red;">pl-table在线预览，更多玩法请看文档哦，欢迎Star</div>
     <el-button @click="$router.push({ path: '/text' })">去子页面(为了测试缓存组件)</el-button>
     <div>
        <el-button @click="clearSelection">清除选中</el-button>
        <el-button @click="setData(3)">变化数据为3条</el-button>
        <el-button @click="setData(200)">变化数据为200条</el-button>
        <el-button @click="setData(1000)">变化数据为1000条</el-button>
        <el-button @click="pagingScrollTopLeft(1000)">滚动到1千位置</el-button>
        <el-button @click="pagingScrollTopLeft(2000)">滚动到2千位置</el-button>
         <el-button @click="pagingScrollTopLeft(0)">滚动到顶部</el-button>
        <el-button @click="scrollBottom">滚动到底部位置</el-button>
        <el-button @click="setHei(400)">设置高度为400</el-button>
        <el-button @click="setHei(300)">设置高度为300</el-button>
    </div>

     <p style="color: red">我是Y轴虚拟</p>
     <pl-table :data="data.tableData"
              ref="plTable"
              big-data-checkbox
              :height="height"
              header-drag-style
              @table-body-scroll="tableBodyScroll"
              fixedColumnsRoll
              show-summary
              :total-option="[{ label: '地址' }]"
              use-virtual
              :row-height="rowHeight">
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

     <p style="margin-top: 20px;color: red">我是X + Y轴同时虚拟</p>
     <plx-table-grid :data="data.tableData"
                     max-height="300"
                     :show-summary="true"
                     :summary-method="summaryMethod"
                     ref="plTable2">
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

     <p style="color: red">我是加入分页的表格</p>
     <pl-table :data="data.tableData"
                big-data-checkbox
                :max-height="height"
                header-drag-style
                fixedColumnsRoll
                use-virtual
                :row-height="rowHeight"
                :pagination-show="true"
                :total="pageForm.total"
                :page-size="pageForm.pageSize"
                :current-page="pageForm.currentPage"
                @handlePageSize="handlePageSize"
      >
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
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
          rowHeight: 50,
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
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true, fixed: 'right'}
        ],
          columns2: Array.from({ length: 20 }, (_, idx) => ({
          prop: 'address', label: '地址' + idx, width: 200, showOverflow: true, sortable: true, fixed: ''
        })),
          data: {
          tableData:Array.from({ length: 20 }, (_, idx) => ({
            id: idx + 1,
            date: '2016-05-03',
            name: 1,
            ab: '欢迎使用pl-table',
            address: 1 + idx
          }))
        },
          top: 0,
          height: 0,
          pageForm: {
              total: 1000,
              pageSize: 10,
              currentPage: 1
          }
      }
    },
    mounted () {
        this.height = window.innerHeight - 50
    },
    methods: {
       // plx的合计
      summaryMethod ({ columns, data }) {
          const means = []
          columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                    means.push('合计')
                } else {
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        means[columnIndex] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        means[columnIndex] += ' 元';
                    } else {
                        means[columnIndex] = '';
                    }
                }
            })
          // 返回一个二维数组的表尾合计
          return [means]
      },
      setHei (val) {
          this.height = val
      },
      tableBodyScroll ({ scrollTop }, e) {
        this.top = scrollTop
      },
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
      },
      scrollBottom () {
         this.$refs.plTable.scrollBottom()
      },
      pagingScrollTopLeft (val) {
         this.$refs.plTable.pagingScrollTopLeft(val, 0)
         this.$refs.plTable2.pagingScrollTopLeft(val, 0)
      },
      // 分页事件
      handlePageSize ({page, size}) {
        console.log(page, size)
      }
    }
  }
</script>
<style>
  body, html {
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
</style>
