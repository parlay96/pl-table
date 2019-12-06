import Table from 'pl-table/package/table';

import Mousewheel from '../directives/mousewheel';

import VirtualTableBodyRender from './virtual-table-body-render.js';
import VirtualTableFooterRender from './virtual-table-footer-render.js';

const elTableVersion = '2.12.0'; // 对应ele版本

const ElTableBody = Table.components.TableBody; // 表体
const ElTableHeader = Table.components.TableHeader; // 头部
const ElTableFooter = Table.components.TableFooter; // 表尾

// 判断版本适应度
function trans(version) {
  const versionNums = version.toString().split('.')
  let result = Array.from({ length: 3 })

  result = result.map((_, idx) => {
    const num = versionNums[idx]

    if (!num) {
      return '00'
    } else {
      return +num < 10 ? `0${num}` : num
    }
  }).join('')

  return +result
}
const ElementUiVersion = trans(elTableVersion) >= trans(2.8)


ElTableBody.directives = {
  Mousewheel
}


// 修改ElTableHeader的toggleAllSelection全选方法
let fasle = false
ElTableHeader.methods.toggleAllSelection = function(event) {
  // 只有当我开启了大数据 并且 开启了大数据下更改全选框，单选框卡顿问题
  if (this.$parent.useVirtual && this.$parent.bigDataCheckbox) {
    if (!fasle) {
      fasle = true
      // 全选
      // this.$parent.useVirtualselectionCheck记录点击全选按钮开启关闭状态 true为开启
      // 当我this.store.states.newisAllSelected等于false,代表我当前是不确定状态，意思就是没选完所有行
      if (!this.store.states.newisAllSelected) {
        this.store.states.data.filter((item => item.plChoose = true))
        this.store.states.selection = [] // 赋值全部数据
        this.store.states.isAllSelected = true; // ele内置的变量
        this.store.states.newisAllSelected = true; // pl-table改源码的变量
        this.$parent.$nextTick(() => {
          this.store.states.selection = this.store.states.data // 赋值全部数据
        })
        this.$parent.$emit('selection-change', this.store.states.data);
        this.$parent.$emit('select-all', this.store.states.data);
      } else {
        // 不全选
        this.store.states.data.filter((item => item.plChoose = fasle))
        this.store.states.selection = [] // 赋值全部数据
        this.store.states.isAllSelected = false; // ele内置的变量
        this.store.states.newisAllSelected = false; // pl-table改源码的变量
        this.$parent.$emit('selection-change', []);
        this.$parent.$emit('select-all', []);
      }
    }
    setTimeout(() =>{
      fasle = false
    })
  } else {
    this.store.commit('toggleAllSelection');
  }
}


// 改变表格数据流
const oldDataComputed = ElTableBody.computed.data
ElTableBody.computed.data = function () {
  const { table } = this
  const tableData = oldDataComputed.call(this)
  if (table.useVirtual) {
    return tableData.slice(table.start, table.end)
  } else {
    return tableData
  }
}


const oldHoverRowHandler = ElTableBody.watch && ElTableBody.watch['store.states.hoverRow']
if (oldHoverRowHandler) {
  ElTableBody.watch['store.states.hoverRow'] = function (newVal, oldVal) {
    if (!this.table.useVirtual) {
      oldHoverRowHandler && oldHoverRowHandler.call(this, newVal, oldVal)
    }
  }
}


// 表体行索引
ElTableBody.methods.getIndex = function (index) {
  return this.table.start + index;
}


// 添加表格行样式
const oldGetRowClassHandler = ElTableBody.methods.getRowClass
ElTableBody.methods.getRowClass = function (row, rowIndex) {
  let classes = oldGetRowClassHandler.call(this, row, rowIndex)
  // 当表格行被禁止，添加不透明度
  if (row.disabled) {
    classes.push('pl-disabled')
  }
  if (this.table.useVirtual && rowIndex === this.store.states.hoverRow && (this.table.rightFixedColumns.length || this.table.fixedColumns.length)) {
    // 兼容element-ui低版本
    if (ElementUiVersion && Object.prototype.toString.call(classes) === '[object Array]') {
      classes.push('hover-row')
    } else if (typeof classes === 'string') {
      classes += ' hover-row'
    }
  }
  return classes
}


// 修改ele表体源码 （进行重新渲染）
const oldRender = ElTableBody.render
ElTableBody.render = function (h) {
  if (this.table.useVirtual) {
    return VirtualTableBodyRender.call(this, h)
  } else {
    return oldRender.call(this, h)
  }
}


// 修改ele尾部源码（进行重新渲染）
const footerRender = ElTableFooter.render
ElTableFooter.render = function (h) {
  if (this.table.addfence) {
    // 添加计算围栏
    return VirtualTableFooterRender.call(this, h)
  } else {
    return footerRender.call(this, h)
  }
}
