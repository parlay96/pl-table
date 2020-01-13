<template>
  <div class="plTableBox" ref="tableBox">
    <div class="ant-table-scroll" :style="{maxHeight: heightSwitch ? maxHeight + 'px' : ''}">
      <el-table ref="singleTable"
                style="width: 100%"
                :data="datas"
                :height="heightSwitch ? maxHeight : undefined"
                :border="border"
                :stripe="stripe"
                :row-key="rowKey"
                :empty-text="emptyText"
                :show-header="showHeader"
                :addfence="addfence"
                :row-class-name="rowClassName"
                :cell-class-name="cellClassName"
                :header-row-class-name="headerRowClassName"
                :fence-method="fenceMethods"
                :excess-rows="excessRows"
                :big-data-checkbox="bigDataCheckbox"
                :size="size"
                :default-expand-all="defaultExpandAll"
                :tree-props="treeProps"
                :span-method="arraySpanMethodFals ? arraySpanMethod : () => {}"
                :rowHeight="rowHeight"
                :tooltipEffect="tooltipEffect"
                :tooltipPlacement="tooltipPlacement"
                :header-drag-style="headerDragStyle"
                :header-drag-show="headerDragShow"
                :use-virtual="useVirtual"
                @row-click="rowClick"
                @row-dblclick="rowDblclick"
                @expand-change="expChang"
                @tableBodyScroll="tableBodyScroll"
                :highlight-current-row="highlightCurrentRow"
                :show-summary="showSummary"
                @header-dragend="headerDragend"
                :summary-method="getSummaries"
                @header-click="headerClick"
                @select="plSelect"
                @select-all="selectAll"
                @selection-change="handleSelectionChange">
        <slot/>
    </el-table>
    </div>
    <div class="myPagination" v-if="paginationShow" ref="myPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="newcurrentPage"
        :pager-count="pagerCount"
        :page-sizes="pageSizes"
        :page-size="newPageSize"
        :layout="paginationLayout"
        :total="ptTotal"/>
    </div>
    <div class="plDialog" ref="plDialog">
      <div style="width: 100%;height: 100%;" v-if="plDialogFals">
        <div class="table-cus-header">{{ fieldTitle }}</div>
        <div class="checkListBox">
          <draggable tag="ul"
                     :options="{disabled: !fieldSort}"
                     v-model="newDialogData">
            <li v-for="(item, index) in newDialogData" :key="index">
              <el-checkbox v-model="item.state" :disabled="item.disabled">{{ item.name }}</el-checkbox>
              <i class="iconfont"
                 :class="[amendBtnIcon || 'el-icon-edit']"
                 v-if="showAmend"
                 @click="amendField(item, index)"/>
            </li>
          </draggable>
        </div>
        <div class="table-cus-footer">
          <el-button @click="closeModal()">取消</el-button>
          <el-button type="primary" @click="confirmField">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import draggable from 'vuedraggable'
  import ResizeObserver from 'resize-observer-polyfill';
  import ElTable from 'pl-table/package/table'
  import plTableColumn from 'pl-table/package/table-column'
  import ElPagination from 'pl-table/package/pagination'
  export default {
    name:'PlTable',
    components: {draggable, ElTable, ElPagination, plTableColumn},
    props: {
      heightSwitch: { type: Boolean, default: true }, // 是否需要去计算表格高度，关闭就相当于自适应高度，超出表格高度不会出现滚动条，开启相当于会去计算外层高度，大于表格高度，超出高度表格出现滚动条 (注意为false时候，请不要设置useVirtual属性)
      heightChange: { default: true, type: Boolean }, // 是否开启表格高度随数据多少而变化，如数据少的时候，想把分页放在底部（永远处于底部）
      autoResize: { default: false, type: Boolean }, // 父元素响应式监听（对于父元素可能存在动态变化的场景,然后表格根据父元素快宽重新渲染）当然你也可以通过手动去调用setHeight()
      datas: {type: Array, default: () => []}, // 表格数据
      dialogData: {type: Array, default: () => []}, // 选择显示字段数组
      stripe: {default: false, type: Boolean}, // 是否为斑马纹
      size: {default: '', type: String}, // Table 的尺寸
      showHeader: {default: true, type: Boolean}, // 是否显示表头
      emptyText: {default: '暂无数据', type: String}, // 空数据时显示的文本内容
      border: {default: true, type: Boolean}, // 是否显示纵向边框
      paginationShow: {default: true, type: Boolean}, // 是否需要分页器 默认是true
      showSummary: {default: false, type: Boolean}, // 是否需要合计
      defaultExpandAll: {default: false, type: Boolean}, // 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
      treeProps: { default () { return { hasChildren: 'hasChildren', children: 'children' } }, type: Object }, // 渲染嵌套数据的配置选项
      ptTotal: {default: 0, type: Number}, // 总条数
      pagerCount: { default: 5, type: Number }, // 页码按钮的数量，当总页数超过该值时会折叠
      pageSize:{ default: 10, type: Number }, // 每页条数
      currentPage: { default: 1, type: Number }, // 当前页
      pageSizes: { default: () => [10, 20, 30, 50], type: Array }, // 每页显示个数选择器的选项设置
      totalOption: { default: () => [], type: Array }, // 需要合计的选项
      sumText: { default: '合计', type: String }, // 合计行名称
      paginationLayout: { default: 'total, sizes, prev, pager, next, jumper', type: String }, // 分页组件布局，子组件名用逗号分隔
      fieldSort: { default: true, type: Boolean }, // 字段排序
      rowKey: { default: '', type: String }, // 支持树类型的数据。此时，必须要指定 row-key (注意，当开启useVirtual时，无效)
      highlightCurrentRow: { default: true, type: Boolean }, // 是否要高亮当前行
      showAmend: { default: false, type: Boolean }, // 是否显示修改字段名按钮(侧滑框)
      amendBtnIcon: { default: '', type: String }, // 修改字段按钮的图标(侧滑框)
      fieldTitle: { default: '选择显示字段', type: String }, // 弹框的标题(侧滑框)
      recordTableSelect: { default: false, type: Boolean }, // 是否记录表格的选项id(必须保证行ID存在，且唯一)
      headerDragStyle: { default: false, type: Boolean }, // 是否修改表格的头部拖动样式  | Boolean | false
      headerDragShow: { default: true, type: Boolean}, // 在配置了header-drag-style属性为true情况下， 如果你想列不可被拖动时，表头列右边框线依然显示
      useVirtual: { default: false, type: Boolean }, // 是否开启虚拟滚动 | Boolean | false
      rowHeight: { default: 60, type: Number }, // 行高(必须要设置行高，否则会导致表格计算不正确)| Number | 60
      excessRows: { default: 3, type: Number }, //	可视区域上方和下方额外渲染的行数，行数越多表格接替渲染效果越好，但越耗性能	Number	3
      pagingScroll: { default: true, type: Boolean }, // 跳转分页是否需要把表体滚动条回到顶部及左侧
      spanMethod: Function, // 合并行或列的计算方法 (注意，当开启useVirtual时，无效)
      tooltipEffect: { default: 'dark', type: String }, // tooltip effect 属性	String	dark/light
      tooltipPlacement: { default: 'top', type: String }, // Tooltip 的出现位置	String	top
      summaryMethod: Function, // 自定义的合计计算方法
      addfence: { default: false, type: Boolean }, // 是否需要在表格尾部添加一行计算表格围栏。（比如你觉得合计一行不够，你还需要求平均值，或者其他）默认为帮你求平均值 | 如果你要自定义 请看fenceMethod属性
      fenceMethod: Function, // 自定义新添加计算围栏的计算方法（类似自定义合计算方法一样）
      bigDataCheckbox: { default: false, type: Boolean }, // 大量数据时候（至少数据量大于3000条每页），表格存在selection选择列表时，是否开启解决全选卡顿（缓慢）问题，开启此项可能影响table-column的selectable属性功能，最好不要使用selectable
      rowClassName: [String, Function], // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
      cellClassName: [String, Function], // 单元格的 className 的回调方法
      headerRowClassName: [String, Function], // 表头行的 className 的回调方法
    },
    data () {
      return {
        _times: '', // 弹框定时器
        plDialogFals: false, // 侧滑弹框是否开启
        newDialogData: [], // 新自定义字段的数据
        maxHeight: '0', // 表格最大高度
        aBox: '', // 蒙层节点
        newPageSize: '', // 每页条数
        newcurrentPage: '', // 当前页
        rowSelectionsData: [], // 当前选中行的数据(用于数据选中回显)  // 必须有type属性为selection
        tableSelectData: [], // 整个表格勾选项（含分页）
        cancelSelectData: [], // 被取消选中的ID数组
        arraySpanMethodFals: false, // 开启合并列条件判断
        newTableStore: '' // 表格的store
      }
    },
    created () {
      this.newPageSize = this.pageSize
      this.newcurrentPage = this.currentPage
      // 是否有条件开启合并列
      if (typeof this.spanMethod === 'function') {
        this.arraySpanMethodFals = true
      }
    },
    mounted () {
      // 监听外侧盒子宽高度变化
      const ro2 = new ResizeObserver((entries, observer) => {
        for (const entry of entries) {
          const {width, height} = entry.contentRect;
          if (this.autoResize) {
            this.setHeight()
          }
        }
      });
      ro2.observe(this.$refs.tableBox);
    },
    methods: {
      // 自定义新添加计算围栏的方法
      fenceMethods (param) {
        if (typeof this.fenceMethod === 'function' && this.fenceMethod) {
          return this.fenceMethod(param)
        }
      },
      // 用于可展开表格与树形表格
      toggleRowExpansion (row, expanded) {
        this.$refs.singleTable.toggleRowExpansion(row, expanded)
      },
      // 合并行或列的计算方法
      arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
        if (this.arraySpanMethodFals) {
          let objs = {row, column, rowIndex, columnIndex}
          if (this.spanMethod(objs)) {
            return this.spanMethod(objs)
          }
        }
      },
      // 利用数组中的filter方法数组去重
      removal (data) {
        if (data.constructor === Array) {
          return data.filter(function(element,index,self){
            return self.indexOf(element) === index;
          })
        } else {
          throw new Error('需要的是数组');
        }
      },
      // 数组对象去重的方法
      removalDataObj (arr, key) {
        if (arr.constructor === Array) {
          let result = [];
          let obj = {};
          for(let i =0; i<arr.length; i++){
            if(!obj[arr[i].row[key]]){
              result.push(arr[i]);
              obj[arr[i].row[key]] = true;
            }
          }
          return result
        } else {
          throw new Error('需要的是数组');
        }
      },
      // 当用户手动勾选全选 Checkbox 时触发的事件	selection
      selectAll (selection) {
        this.$emit('select-all', selection)
        // 当用户取消全选，就去找出表格当前的数据ID,然后去删除记录选择项ID数组对应的值
        if (this.recordTableSelect) {
          if (selection.length === 0) {
            // this.datas当前页的数据（当前表格数据）
            this.datas.forEach(item => {
              this.tableSelectData.forEach((is, index) => {
                if (item.id === is) {
                  this.cancelSelectData.push(item.id)
                  this.tableSelectData.splice(index, 1)
                }
              })
            })
          }
          // 全选 就去找出表格被取消选中的ID数组,然后去删除ID数组对应的值
          if (selection.length > 0) {
            selection.forEach(item => {
              this.cancelSelectData.forEach((is, index) => {
                if (item.id === is) {
                  this.cancelSelectData.splice(index, 1)
                }
              })
            })
          }
          // 这就是整个表格当前选中项（包含分页）
          this.$emit('table-select-change', this.tableSelectData, this.cancelSelectData)
        }
      },
      // 当用户手动勾选数据行的 Checkbox 时触发的事件
      plSelect (selection, row) {
        this.$emit('select', selection, row)
        // （执行删除选中节点操作）
        if (row.id && this.recordTableSelect) {
          // 思路如下：  selection表示当前表格选中的节点数组, row表示当前点击的行节点
          // 1.如果selection中存在row ， 代表当前是勾上节点
          // 2.相反selection中不存在row ， 代表当前是在取消选中节点
          // 3.如果当前在取消选中节点，则falsData为空
          // 4.如果falsData为空，则去执行删除 -> 存放整个表格（包含分页）的数组中的值 （则 his.dats整个表格（包含分页）选中的节点数组节点ID）
          // 5. 这一步非常重要（判断当时节点是关闭，还是开启）
          let falsData = selection.filter(item => item.id === row.id)
          // 如果falsData数组为空，则代表当前节点被关闭了
          if (falsData.length === 0) {
            this.tableSelectData.forEach((item, index) => {
              if (item === row.id) {
                this.cancelSelectData.push(row.id)
                this.tableSelectData.splice(index, 1)
              }
            })
          }
          // 当前节点被开启
          if (falsData.length > 0) {
            this.cancelSelectData.forEach((item, index) => {
              if (item === row.id) {
                this.cancelSelectData.splice(index, 1)
              }
            })
          }
          // 这就是整个表格当前选中项（包含分页）
          this.$emit('table-select-change', this.tableSelectData, this.cancelSelectData)
        }
      },
      // 当选择项发生变化时会触发该事件
      handleSelectionChange (val) {
        this.$emit('selection-change', val)
        if (this.recordTableSelect) {
          //（做添加选中节点操作）
          val.forEach(value => {
            this.tableSelectData.push(value.id)
          })
          // 数组去重然后再赋值
          this.tableSelectData = JSON.parse(JSON.stringify(this.removal(this.tableSelectData)))
          // 这就是整个表格当前选中项（包含分页）
          this.$emit('table-select-change', this.tableSelectData, this.cancelSelectData)
        }
      },
      // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
      toggleRowSelection (rows) {
        if (rows && rows.constructor === Array) {
          // 需要记录选中项id
          if (this.recordTableSelect) {
            // 去重过后的值
            let datasFiler = this.removalDataObj(rows, 'id')
            // 筛选过滤数组
            function filterFun(data, isd) {
              return data.filter(item => item.row.id !== isd)
            }
            this.cancelSelectData.forEach(isd => {
              datasFiler = filterFun(datasFiler, isd)
            })
            // 赋值给选中的变量
            this.rowSelectionsData = datasFiler
          } else {
            this.rowSelectionsData = rows
          }
          this.newtoggleRowSelections()
        } else {
          console.error('数据格式需要一个数组')
        }
      },
      // 用于多选表格，切换某一行的选中状态
      newtoggleRowSelections () {
        if (this.rowSelectionsData.length > 0 && this.$refs.singleTable) {
          this.rowSelectionsData.forEach(item => {
            if (item.selected) {
              this.$refs.singleTable.toggleRowSelection(item.row, item.selected)
            } else if (item.selected === false) {
              this.$refs.singleTable.toggleRowSelection(item.row, false)
            } else if (item.selected === undefined) {
              this.$refs.singleTable.toggleRowSelection(item.row)
            }
          })
        }
      },
      // 用于多选表格，切换所有行的选中状态
      toggleAllSelection () {
        if (this.$refs.singleTable) {
          this.$refs.singleTable.toggleAllSelection()
        } else {
          console.error('clearSelection方法为找到，可能表格未加载完毕')
        }
      },
      // 用于多选表格，清空用户的选择
      clearSelection () {
        if (this.$refs.singleTable) {
          this.$refs.singleTable.clearSelection()
        } else {
          console.error('clearSelection方法为找到，可能表格未加载完毕')
        }
      },
      // 分页器的事件
      handleSizeChange (val) {
        this.newPageSize = val
        this.$emit('handlePageSize', { size: this.newPageSize, page: this.newcurrentPage })
      },
      handleCurrentChange (val) {
        // 跳转分页需要回到顶部
        if (this.pagingScroll && this.useVirtual && this.$refs.singleTable) {
          this.$refs.singleTable.pagingScrollTop(0)
        }
        this.newcurrentPage = val
        this.$emit('handlePageSize', { size: this.newPageSize, page: this.newcurrentPage })
      },
      // 让表格滚动条回到顶部，和左侧
      pagingScrollTopLeft () {
        this.$refs.singleTable.pagingScrollTop(0)
      },
      // 合计的方法
      getSummaries (param) {
        if (typeof this.summaryMethod === 'function' && this.summaryMethod) {
          return this.summaryMethod(param)
        } else {
          const {columns, data} = param
          const sums = []
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = this.sumText
              return
            }
            const values = data.map(item => Number(item[column.property]))
            // 需要合并的选项
            const flas = this.totalOption.filter(item => item.label === column.label)
            if (!values.every(value => isNaN(value)) && flas.length > 0) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
              sums[index] += flas[0].unit || ''
            } else {
              sums[index] = ''
            }
          })
          return sums
        }
      },
      // 打开自定义字段框
      plDialogOpens () {
        this._times = null
        this.$refs.plDialog.style.width = 300 + 'px'
        this._times = setTimeout(() => {
          this.plDialogFals = true
        }, 100)
        // 创建节点（主要用来弹出menu窗口时，不让起点击外面）
        this.aBox = document.createElement('div')
        this.aBox.className = 'modal-backdrop'
        this.aBox.style.display = 'block'
        this.aBox.onclick = () => {
          this.closeModal()
        }
        document.body.appendChild(this.aBox)
      },
      // 关闭自定义字段框（取消选择）
      closeModal () {
        this.plDialogFals = false
        clearTimeout(this._times)
        this.$refs.plDialog.style.width = 0 + 'px'
        this.aBox.style.display = 'none'
        this.clearNode()
        this.newDialogData = JSON.parse(JSON.stringify(this.dialogData))
      },
      // 确认按钮
      confirmField () {
        this.$emit('show-field', this.newDialogData)
        this.plDialogFals = false
        clearTimeout(this._times)
        this.$refs.plDialog.style.width = 0 + 'px'
        this.aBox.style.display = 'none'
        this.clearNode()
      },
      // 设置表格高度
      setHeight () {
        if (this.$refs.tableBox) {
          let myPagination = this.$refs.myPagination ? this.$refs.myPagination.offsetHeight : 0
          let tableBox = this.$refs.tableBox.offsetHeight
          this.$nextTick(() => {
            this.maxHeight = tableBox - myPagination
            // 随数据高度变化
            if (this.heightChange) {
              this.$nextTick(() => {
                if (!this.$refs.singleTable) return
                this.$refs.singleTable.$el.childNodes.forEach(item => {
                  // 表体高
                  if (item.className && item.className.indexOf('el-table__body-wrapper') !== -1) {
                    if (parseInt(item.style.height)) {
                      if (item.children[0]) {
                        // 表体高度如果大于，表体内容的高度，代表表格高度得减少
                        let tablebodyH = parseInt(item.style.height) - item.children[0].offsetHeight
                        if (tablebodyH > 0) {
                          // 获取表格宽度  判断是否出现滚动条
                          // let scrollBarH = 0 // 滚动条样式高度
                          // item.children[0].childNodes.forEach(items => {
                          //   if (items.className && items.className.indexOf('vue-element-bigdata-table-div') !== -1) {
                          //     // 如果出现滚动条(就要把表体高度加上9,   9就是滚动条样式的高度，) 9
                          //     console.log(items.offsetWidth, item.offsetWidth)
                          //     if (items.offsetWidth > item.offsetWidth) {
                          //       console.log(items.offsetWidth, item.offsetWidth)
                          //       scrollBarH = 9
                          //     }
                          //   }
                          // })
                          // 如果出现滚动条(就要把表体高度加上9,   9就是滚动条样式的高度，) 9
                          this.maxHeight = tableBox - myPagination - tablebodyH + 9
                          // 如果没数据 就加上提示的高度
                          if (this.datas.length ===0) {
                            this.maxHeight = this.maxHeight + 82
                          }
                        }
                      }
                    }
                  }
                })
              })
            }
            this.$emit('load-complete', this.$refs.singleTable)
          })
        }
      },
      // 当某一行被点击时会触发该事件
      rowClick (row, column, event) {
        if (this.highlightCurrentRow) {
          this.$refs.singleTable.setCurrentRow(row);
        }
        this.$emit('row-click', row, column, event)
        // 如果当前节点存在current-row，再次点击时候那么就去掉current-row效果
        if (event.path && this.highlightCurrentRow) {
          event.path.forEach(item => {
            if (item && item.classList) {
              item.classList.forEach(its => {
                if (its === 'current-row') {
                  this.$refs.singleTable.setCurrentRow();
                }
              })
            }
          })
        }
      },
      // 当某一行被双点击时
      rowDblclick (row, column, event) {
        this.$emit('row-dblclick', row, column, event)
      },
      // 用于单选表格，设定某一行为选中行
      setCurrentRow (row) {
        if (row) {
          this.$refs.singleTable.setCurrentRow(row);
        } else {
          this.$refs.singleTable.setCurrentRow();
        }
      },
      // 当用户对某一行展开或者关闭的时候会触发该事件
      expChang (row, expandedRows) {
        this.$emit('expand-change', row, expandedRows)
      },
      // 当某一列的表头被点击时会触发该事件
      headerClick (column, event) {
        this.$emit('header-click', column, event)
      },
      // 修改字段名按钮事件
      amendField (item, index) {
        this.$emit('amend-field', item, index)
      },
      // 表体滚动事件
      tableBodyScroll (table, event) {
        // 当表格滚动暴露滚动事件
        this.$emit('table-body-scroll', table, event)
      },
      // 当拖动表头改变了列的宽度的时候会触发该事件(newWidth, oldWidth, column, event)
      headerDragend (newWidth, oldWidth, column, event) {
        this.$emit('header-dragend', newWidth, oldWidth, column, event)
      },
      // 删除节点
      clearNode () {
        // 删除节点
        let parent = this.aBox ? this.aBox.parentNode : ''
        parent && parent.removeChild(this.aBox)
        let doms = document.getElementsByClassName('modal-backdrop')
        if (doms.length > 0) {
          document.body.removeChild(doms[0])
        }
        this.aBox = null
      }
    },
    // 生命周期结束
    beforeDestroy () {
    },
    // 如果使用了keep-alive
    deactivated () {
    },
    activated () {
    },
    watch: {
      datas: {
        deep: true,
        immediate: true,
        handler (val) {
          this.$nextTick(() => {
            this.setHeight()
            // 去设置选中项
            this.newtoggleRowSelections()
          })
        }
      },
      dialogData: {
        deep: true,
        immediate: true,
        handler (val) {
          this.newDialogData = JSON.parse(JSON.stringify(val))
        }
      },
      currentPage (val) {
        this.newcurrentPage = val
      },
      pageSize (val) {
        this.newPageSize = val
      }
    }
  }
</script>
