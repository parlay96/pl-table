export default {
  props: {
    rowHeight: {
      type: Number,
      default: 60
    },
    excessRows: {
      type: Number,
      default: 3
    },
    headerDragStyle: {
      type: Boolean,
      default: false
    },
    headerDragShow: {
     type: Boolean,
     default: false
    },
    tooltipPlacement: {
      default: 'top',
      type: String
    },
    addfence: {
      type: Boolean,
      default: false
    },
    fenceMethod: Function,
    useVirtual: {
      type: Boolean,
      default: false
    },
    // 大数据下是否更改全选框，单选框卡顿问题
    bigDataCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scrollTop: 0,
      innerTop: 0,
      start: 0,
      end: 0
    }
  },
  computed: {
    visibleCount () {
      return Math.ceil(this.height / this.rowHeight)
    },

    virtualBodyHeight () {
      return this.data.length * this.rowHeight
    }
  },
  watch: {
    scrollTop: {
      immediate: true,
      handler (top) {
        this.computeScrollToRow(top)
      }
    },

    useVirtual: {
      immediate: true,
      handler(newVal) {
        // 把当前状态存入store.states里面
        this.store.states.useVirtual = newVal
      }
    },

    bigDataCheckbox: {
      immediate: true,
      handler(newVal) {
        // 把当前状态存入store.states里面
        this.store.states.bigDataCheckbox = newVal
      }
    },

    virtualBodyHeight () {
      setTimeout(this.doLayout, 10)
    },

    height (val) {
      this.computeScrollToRow(this.scrollTop)
    }
  },
  mounted () {
    // 暴露store对象对pl-table
    this.$parent.newTableStore = this.store
    // 绑定表体滚动事件
    this.$nextTick(() => {
      if (this.useVirtual) {
        const tableBodyWrapper = this.$el.querySelector('.el-table__body-wrapper')
        tableBodyWrapper.addEventListener('scroll', this.handleScroll)
        tableBodyWrapper.addEventListener('DOMMouseScroll', this.handleScroll)
      }
    })
  },
  activated () {
    if (this.useVirtual) {
      this.computeScrollToRow(0)
    }
  },
  methods: {
    // 表体滚动到什么位置
    pagingScrollTop (top) {
      const tableBodyWrapper = this.$el.querySelector('.el-table__body-wrapper')
      if (tableBodyWrapper) {
        tableBodyWrapper.scrollTop = top
        tableBodyWrapper.scrollLeft = 0
      }
    },

    computeScrollToRow (scrollTop) {
      let startIndex = parseInt(scrollTop / this.rowHeight)

      const { start, end } = this.getVisibleRange(startIndex)
      this.start = start
      this.end = end
      this.innerTop = this.start * this.rowHeight
    },

    getVisibleRange (expectStart) {
      const start = expectStart - this.excessRows

      return {
        start: start >= 0 ? start : 0,
        end: expectStart + this.visibleCount + this.excessRows
      }
    },

    handleScroll (e) {
      const ele = e.srcElement || e.target
      let { scrollTop } = ele
      const bodyScrollHeight = this.visibleCount * this.rowHeight

      // 解决 滚动时 行hover高亮的问题
      this.store.states.hoverRow = null

      if (this.virtualBodyHeight < scrollTop + bodyScrollHeight) {
        scrollTop = this.virtualBodyHeight - bodyScrollHeight
      }

      this.scrollTop = scrollTop

      // 当表格滚动暴露滚动事件
      this.$emit('tableBodyScroll', this, e)
    }
  },
  beforeDestroy () {
    // 解绑事件
    const tableBodyWrapper = this.$el.querySelector('.el-table__body-wrapper')
    if (tableBodyWrapper) {
      tableBodyWrapper.removeEventListener('scroll', this.handleScroll)
      tableBodyWrapper.removeEventListener('DOMMouseScroll', this.handleScroll)
    }
  }
}
