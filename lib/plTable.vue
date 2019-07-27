<template>
  <div class="tableBox" ref="tableBox">
    <div class="ant-table-scroll" :style="{maxHeight: !heightSwitch ? '' : maxHeight + 'px'}">
      <el-table class="drag_table"
                v-if="tableState"
                :data="datas"
                :border="border"
                :max-height="!heightSwitch ? 'false' : maxHeight"
                :stripe="stripe"
                :row-key="rowKey"
                @row-click="rowClick"
                @row-dblclick="rowDblclick"
                @expand-change="expChang"
                ref="singleTable"
                :highlight-current-row="highlightCurrentRowFalse"
                :show-summary="showSummary"
                @header-dragend="headerDragend"
                :summary-method="getSummaries"
                @select="plSelect"
                @select-all="selectAll"
                @selection-change="handleSelectionChange">
        <slot/>
        <el-table-column :resizable="false" v-if="dropAction">
          <template slot="header" slot-scope="scope">
            <div style="opacity: 0">我纯属占位</div>
          </template>
          <template slot-scope="scope">
            <div ref="occupyingelements" style="opacity: 0">我纯属占位</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="myPagination" :class="{ disIb: !paginationShow }" ref="myPagination">
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
      <div class="table-cus-header">{{ fieldTitle }}</div>
      <div class="checkListBox">
        <draggable tag="ul"
                   v-if="fieldSort"
                   v-model="newDialogData">
          <li v-for="(item, index) in newDialogData" :key="index">
            <el-checkbox v-model="item.state" :disabled="item.disabled">{{ item.name }}</el-checkbox>
            <i class="iconfont"
               :class="[amendBtnIcon || 'el-icon-edit']"
               v-if="showAmend"
               @click="amendField(item, index)"/>
          </li>
        </draggable>
        <ul v-else>
          <li v-for="(item, index) in newDialogData" :key="index">
            <el-checkbox v-model="item.state" :disabled="item.disabled">{{ item.name }}</el-checkbox>
            <i class="iconfont"
               :class="[amendBtnIcon || 'el-icon-edit']"
               v-if="showAmend"
               @click="amendField(item, index)"/>
          </li>
        </ul>
      </div>
      <div class="table-cus-footer">
        <el-button @click="closeModal()">取消</el-button>
        <el-button type="primary" @click="confirmField">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import draggable from 'vuedraggable'
  import './plTableStyle.less'
  export default {
    components: {draggable},
    props: {
      countHeightTime: {type: Number, default: 0}, // 跳到这个页面，倒计时多少秒在去计算表格高度（主要用于页面动画效果，计算高度不准确）
      dropAction: { type: Boolean, default: true }, // 是否开启掉落元素
      datas: {type: Array, default: () => []}, // 表格数据
      dialogData: {type: Array, default: () => []}, // 选择显示字段数组
      stripe: {default: false, type: Boolean}, // 是否为斑马纹
      border: {default: true, type: Boolean}, // 是否显示纵向边框
      paginationShow: {default: true, type: Boolean}, // 是否需要分页器 默认是true
      showSummary: {default: false, type: Boolean}, // 是否需要合计
      ptTotal: {default: 0, type: Number}, // 总条数
      pagerCount: { default: 5, type: Number }, // 页码按钮的数量，当总页数超过该值时会折叠
      pageSize:{ default: 1, type: Number }, // 每页条数
      currentPage: { default: 1, type: Number }, // 当前页
      pageSizes: { default: () => [10, 20, 30, 50], type: Array }, // 每页显示个数选择器的选项设置
      totalOption: { default: () => [], type: Array }, // 需要合计的选项
      sumText: { default: '合计', type: String }, // 合计行名称
      paginationLayout: { default: 'total, sizes, prev, pager, next, jumper', type: String }, // 分页组件布局，子组件名用逗号分隔
      fieldSort: { default: true, type: Boolean }, // 字段排序
      rowKey: { default: '', type: String }, // 支持树类型的数据。此时，必须要指定 row-key
      highlightCurrentRow: { default: true, type: Boolean }, // 是否要高亮当前行
      showAmend: { default: false, type: Boolean }, // 是否显示修改字段名按钮(侧滑框)
      amendBtnIcon: { default: '', type: String }, // 修改字段按钮的图标(侧滑框)
      fieldTitle: { default: '选择显示字段', type: String }, // 弹框的标题(侧滑框)
      heightSwitch: { default: true, type: Boolean }, // 表格是否流体高度
      recordTableSelect: { default: false, type: Boolean } // 是否记录表格的选项id(必须保证行ID存在，且唯一)
    },
    data () {
      return {
        highlightCurrentRowFalse: true, // 是否要高亮当前行
        newDialogData: [], // 新自定义字段的数据
        maxHeight: '0', // 表格最大高度
        tableState: false, // 表格状态
        aBox: '', // 蒙层节点
        newPageSize: '', // 每页条数
        newcurrentPage: '', // 当前页
        screenHeight: 0, // 当前窗口高度
        rowSelectionsData: [], // 当前选中行的数据(用于数据选中回显)  // 必须有type属性为selection
        tableSelectData: [], // 整个表格勾选项（含分页）
        cancelSelectData: [], // 被取消选中的ID数组
      }
    },
    created () {
      this.newPageSize = this.pageSize
      this.newcurrentPage = this.currentPage
    },
    mounted () {
      // 创建节点（主要用来弹出menu窗口时，不让起点击外面）
      this.aBox = document.createElement('div')
      this.aBox.className = 'modal-backdrop'
      this.aBox.style.display = 'none'
      this.aBox.onclick = () => {
        this.closeModal()
      }
      document.body.appendChild(this.aBox)
      // 监听窗口变化
      window.onresize = () => {
        return (() => {
          this.screenHeight = document.documentElement.clientHeight
        })()
      }
      // 防止页面使用动画，导致计算高度不准确
      setTimeout(() => {
        this.setHeight()
      }, this.countHeightTime)
      // 分页信息
      this.$emit('handlePageSize', { size: this.newPageSize, page: this.newcurrentPage })
    },
    methods: {
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
        this.$emit('handle-selection-change', val)
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
        } else {
          console.error('数据格式需要一个数组')
        }
      },
      // 用于多选表格，切换某一行的选中状态
      newtoggleRowSelections () {
        if (this.rowSelectionsData.length > 0) {
          setTimeout(() => {
            this.rowSelectionsData.forEach(item => {
              if (item.selected) {
                this.$refs.singleTable.toggleRowSelection(item.row, item.selected)
              } else {
                this.$refs.singleTable.toggleRowSelection(item.row, false)
              }
            })
          }, 100)
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
      // 当拖动表头改变了列的宽度的时候会触发该事件(newWidth, oldWidth, column, event)
      headerDragend (newWidth, oldWidth, column, event) {
        this.$emit('header-dragend', newWidth, oldWidth, column, event)
      },
      // dropAction(隐藏占位右边线条)
      dropActionFun () {
        setTimeout(() => {
          if (document.getElementsByClassName('el-table__header')[0]) {
            let dom = document.getElementsByClassName('el-table__header')[0].getElementsByClassName('has-gutter')[0]
            for (var i = 0; i<= dom.childNodes[0].childNodes.length; i++) {
              if (dom.childNodes[0].childNodes[i] && dom.childNodes[0].childNodes[i].innerText.indexOf('我纯属占位')!== -1) {
                dom.childNodes[0].childNodes[i].style.borderRight = 'none'
              }
            }
          }
        }, 300)
      },
      // 分页器的事件
      handleSizeChange (val) {
        this.newPageSize = val
        this.$emit('handlePageSize', { size: this.newPageSize, page: this.newcurrentPage })
      },
      handleCurrentChange (val) {
        this.newcurrentPage = val
        this.$emit('handlePageSize', { size: this.newPageSize, page: this.newcurrentPage })
      },
      // 合计的方法
      getSummaries (param) {
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
      },
      // 打开自定义字段框
      plDialogOpens () {
        this.$refs.plDialog.style.width = 300 + 'px'
        this.aBox.style.display = 'block'
      },
      // 关闭自定义字段框（取消选择）
      closeModal () {
        this.$refs.plDialog.style.width = 0 + 'px'
        this.aBox.style.display = 'none'
        this.newDialogData = JSON.parse(JSON.stringify(this.dialogData))
      },
      // 确认按钮
      confirmField () {
        this.$emit('show-field', this.newDialogData)
        this.$refs.plDialog.style.width = 0 + 'px'
        this.aBox.style.display = 'none'
      },
      // 设置表格高度
      setHeight () {
        if (this.$refs.myPagination &&  this.$refs.tableBox) {
          let myPagination = this.$refs.myPagination.offsetHeight
          let tableBox = this.$refs.tableBox.offsetHeight
          let h = tableBox - myPagination
          this.maxHeight = h
          this.tableState = false
          this.$nextTick(() => {
            this.tableState = true
            this.dropActionFun()
            // 去设置选中项
            this.newtoggleRowSelections()
            setTimeout(() =>{
              // 表格加载完成回调
              this.$emit('load-complete', this.$refs.singleTable)
            }, 100)
          })
        }
      },
      // 当某一行被点击时会触发该事件
      rowClick (row, column, event) {
        if (this.highlightCurrentRow) {
          this. highlightCurrentRowFalse = true
        }
        // this.$refs.singleTable.setCurrentRow(row);
        this.$emit('row-click', row, column, event)
      },
      // 当某一行被双点击时
      rowDblclick (row, column, event) {
        if (this.highlightCurrentRow) {
          this. highlightCurrentRowFalse = false
        }
        // this.$refs.singleTable.setCurrentRow();
        this.$emit('row-dblclick', row, column, event)
      },
      // 当用户对某一行展开或者关闭的时候会触发该事件
      expChang (row, expandedRows) {
        this.$emit('expand-change', row, column, event)
      },
      // 修改字段名按钮事件
      amendField (item, index) {
        this.$emit('amend-field', item, index)
      },
      // 删除节点
      clearNode () {
        // 删除节点
        let parent = this.aBox.parentNode
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
      this.clearNode()
    },
    // 如果使用了keep-alive
    deactivated () {
      this.clearNode()
    },
    activated () {
      // 创建节点（主要用来弹出menu窗口时，不让起点击外面）
      this.aBox = document.createElement('div')
      this.aBox.className = 'modal-backdrop'
      this.aBox.style.display = 'none'
      this.aBox.onclick = () => {
        this.closeModal()
      }
      document.body.appendChild(this.aBox)
      setTimeout(() => {
        this.setHeight()
      }, this.countHeightTime)
    },
    watch: {
      datas: {
        deep: true,
        handler (val) {
          this.setHeight()
        }
      },
      dialogData: {
        deep: true,
        handler (val) {
          this.newDialogData = JSON.parse(JSON.stringify(val))
          // this.confirmField() // 获取当前的自定义字段
        }
      },
      screenHeight (val) {
        this.setHeight()
      },
      currentPage (val) {
        this.newcurrentPage = this.currentPage
      }
    }
  }
</script>
