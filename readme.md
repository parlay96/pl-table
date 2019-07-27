# pl-table
> 一个基于element的表格

# method of use
> npm i pl-table vuedraggable

# 实例文件（用法）
  https://github.com/livelyPeng/pl-table/blob/master/Example/index.vue

# Component API
  https://github.com/penglei1996/pl-table/wiki/Component-API

# Attributes（表格属性）
        datas // 表格数据

        record-table-select // 是否记录表格的选项id(必须保证行ID存在，且唯一) 默认为false

        height-switch: 默认值为true // 为true 属性为 Table 指定最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条。
                                    然后只需要在表格外层盒子，给个高度就行，外层盒子不给高度则，代表百分百的盒子
                                 // 为false，则代表 表格不需要最大高度，内容多高表格多高，不会固定表头，不会出现滚动条

        countHeightTime 默认值number（ 0 ） 跳到这个页面，倒计时多少秒在去计算表格高度
                                                  （主要用于页面动画效果，计算高度不准确）

        drop-action 是否开启掉落元素。（注：就是在表格列中多加一项，用来解决拖动表格引
                                         起的表格宽度变小问题，多加一列，页面是看不见的。） 默认为 true

        border 是否显示纵向边框 默认 true

        show-summary 是否需要合计 默认 false

        highlight-current-row // 是否要高亮当前行

        stripe 是否为斑马纹 table 默认 false

        highlight-current-row  是否要高亮当前行 boolean  默认为false

        sum-text 合计行第一列的文本	String 默认为‘合计’

	    	rowKey  支持树类型的数据。此时，必须要指定 row-key

        totalOption 需要合计的选项（需要开启showSummary：true）

        totalOption格式如下 = [{
          label: '金额', // 需要合计的表头名
          unit: '元' // 合计出来的单位名
        }]

# Methods（表格的方法）
      this.$refs.plTable.toggleAllSelection()  用于多选表格，切换所有行的选中状态

      this.$refs.plTable.clearSelection()	用于表格多选，清空用户的选择

      this.$refs.plTable.toggleRowSelection(rows) 用于表格多选，切换某一行的选中状态，
                                             rows数据格式: [
                                               {  row: row, 需要显示的行row  obj
                                                  selected: true 设置这一行选中与否（selected 为 true 则选中） Boolean
                                                  注意： 1. selected不传，则代表当前row为不勾选
                                                         2. selected传了值(必须为false，则代表当前row为不勾选,其他值都是为勾选（TS写法无效）)
                                               }
                                             ]

      this.$refs.plTable.setHeight() // 当窗口高度变化或者外层高度变化，就调用该方法

# Events（表格的事件）
       @table-select-change  整个表格Checkbox选中的row的id数组, 必须保证row（表格的行数据）存在id且唯一，没有ID可以自己造
                         // 当@handle-selection-change || @select || @select-all事件触发，就会触发这个事件 （可以用来回显表格勾选状态）
                         // 参数为 tableSelectData， cancelSelectData
                         // 第一个参数是当前表格（含分页）选中项id数组     第二个参数是当前表格（含分页）取消项id数组
                         // 注意： 该事件触发方式 需要设置表格属性  record-table-select：true// 具体看表格属性

       @select-all	当用户手动勾选全选 Checkbox 时触发的事件	selection

       @select  当用户手动勾选数据行的 Checkbox 时触发的事件	selection, row

       @load-complete 当表格加载完成的事件回调 (当高度变化，数据变化，都会重新去计算表格，重新绘画表格，所以需要有些情况，想知道表格加载情况)
                      参数为 plTable实例对象

       @row-dblclick  当某一行被双击时会触发该事件 参数 row, column, event

       @expand-change	 当用户对某一行展开或者关闭的时候会触发该事件	row, expandedRows

       @row-click  当某一行被点击时会触发该事件  参数 row, column, event

       @handle-selection-change  当选择项发生变化时会触发该事件 参数为当前选中的值

       @header-dragend  当拖动表头改变了列的宽度的时候会触发该事件  参数为newWidth, oldWidth, column, event

# Attributes（分页属性）
       paginationShow 是否需要分页器 默认是true

       pagerCount 页码按钮的数量，当总页数超过该值时会折叠

       page-sizes	每页显示个数选择器的选项设置 [number， number，number] 默认值	[10, 20, 30, 50]

       ptTotal 数据总条数

       pageSize 每页条数

       currentPage 当前页

       paginationLayout 组件布局，子组件名用逗号分隔 (默认值 'total, sizes, prev, pager, next, jumper')

# Events（分页的事件）
      @handlePageSize 获取当前分页的数据 参数为 page 和 size

# Attributes（操作（显示字段）属性）
      dialogData 选择显示字段数组

      showAmend 是否显示修改字段名按钮 默认值为 false

      fieldTitle 弹框的标题 默认为'选择显示字段'

      amendBtnIcon 修改字段名按钮的图标字体 (必须是iconfont字体) 默认为 'el-icon-edit'

      field-sort 显示字段是否排序 默认值为 true （使用排序前  先安装vuedraggable， npm i vuedraggable）

      dialogData格式如下 [{
         name: '我的', // 字段名
         state: true, // 选择状态
         disabled: true // 是否禁用
      }]

# Events（操作（显示字段）的事件）
     @amend-field // 修改单个字段按钮点击事件 参数为 row, index

     @show-field  // 获取当前的需要显示的字段 参数为当前的字段数组

# Methods（操作（显示字段）的方法）
     this.$refs.plTable.plDialogOpens() // 打开弹窗


