# pl-table  当前版本: "version": "2.5.8"
> 最新: 全新升级X + Y轴同时虚拟的诞生！请看底部的 plx-table-grid表格的API及实例文件

> 重点: 一个表格插件（完美解决万级数据渲染卡顿问题），过万数据点击全选卡顿，等等问题

> 重点： pl-table基于element-ui，在此感谢element-ui全体作者

> 重点:  流畅渲染万级数据并不会影响到 element-ui el-table组件的(原有)功能，并且新增了一些功能，具体请看属性配置

> 注:  关于项目中使用pl-table打包后文件体积大，如何优化问题，请加下面群了解！

> 注: 看表格实例效果代码去看element Table 表格效果代码（比如你不知道怎么合并列，合计,多级表头，怎么写请你去看element表格），唯一不同的就是把el-table组件名改成pl-table, el-table-column改成pl-table-column, 然后对照pltable api进行开发吧!!

> 注: 有了表格,怎么导出表格数据为excel并且带样式呢?,请点击https://github.com/livelyPeng/pl-export-excel

> author: pl （更多问题请加入pl-table交流群吧： 675286117）感谢点击上方的Star！！！

> 扫码加群： ![image](https://livelypeng.github.io/pl-table/assets/plTableCode.png)

[点击查看pl-table在线demo](https://livelypeng.github.io/pl-table/pl-dist/index.html)

# 安装方式 and 引入方式
  ** npm方式安装 **
``` javascript
  // npm i pl-table

  // npm引入方式 如下
  // main.js
  import plTable from 'pl-table'

  import 'pl-table/themes/index.css' // 引入样式（必须引入)，请查看webpack是否配置了url-loader对woff，ttf文件的引用,不配置会报错哦

  import 'pl-table/themes/plTableStyle.css' // 默认表格样式很丑 引入这个样式就可以好看啦（如果你不喜欢这个样式，就不要引入，不引入就跟ele表格样式一样）

  Vue.use(plTable);

  new Vue({
    el: '#app',
    render: h => h(App)
  });

  // 注意：如果你不想在入口文件注入, 而是想在单个某个文件页面引入，你可以这样写哦
  import { PlTable, PlTableColumn, PlxTableGrid, PlxTableColumn } from 'pl-table';
  export default {
    components: {
      PlTable,
      PlTableColumn
    },
  }
```

  ** CDN方式 **
``` javascript
  <!--引入表格样式-->
  <link rel="stylesheet" href="https://unpkg.com/pl-table/themes/index.css">

  <!--默认表格样式很丑 引入这个样式就可以好看啦-->
  <link rel="stylesheet" href="https://unpkg.com/pl-table/themes/plTableStyle.css">

  <!-- import Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>

  <script src="https://unpkg.com/pl-table/lib/index.js"></script>
```


# 用前须知
   1. 使用use-virtual渲染大数据属性: 暂不支持树形数据与懒加载与展开行

# pl-table表格的API
 **2.4.6及以上版本api**
  https://github.com/livelyPeng/pl-table/wiki/Component-API-2.4.6%E5%8F%8A%E4%BB%A5%E4%B8%8A%E7%89%88%E6%9C%AC

 **2.3.6及以下版本api**
  https://github.com/livelyPeng/pl-table/wiki/component-api-2.3.6%E5%8F%8A%E4%BB%A5%E4%B8%8B%E7%89%88%E6%9C%AC

# plx-table-grid表格的API（对列没有刚需的，没必要用这个，用上面的pl-table就行，看实例写法点击下面的npm方式实例就完啦！）
 **2.5.4及以上版本api**
 https://github.com/livelyPeng/pl-table/wiki/plx-table-grid-APi

# 实例文件（基础用法）
>  https://github.com/livelyPeng/pl-table/blob/master/Example/index.vue // npm方式实例
>  https://github.com/livelyPeng/pl-table/blob/master/Example/cdnIndex.html  // cdn方式实例


# 更新日志
**2.5.8**
1.修改2.5.7bug
2. 调用clearSelection不触发@selection-change等问题

**2.5.7**
1.修改2.5.4bug

**2.5.4**
1.全新升级X + Y轴同时虚拟的诞生

**2.5.3**
1. 使用big-data-checkbox属性时： 初次选择复选框选中后必须鼠标移出当前行才有状态变化，如果鼠标还在当前行停留的话复选框状态是不会变化的
2. 使用big-data-checkbox属性时  clearSelection方法不可用
3. 解决表格有固定列,同时表格有合计,同时表格有横向滚动条，会导致固定列部分的横向滚动条不可拖动
4. 优化表格

**2.5.2**
1.修改全选，反选，然后调用toggleRowSelection方法的BUG，
2. 优化表格事件

**2.4.9**
1.优化表格事件，修改切换某一行的选中状态方法BUG

**2.4.8**
1.优化表格，添加API

**2.4.7**
 1.优化表格事件，添加API

 **2.4.6**
 1.全新版本升级，基本用法一样，安装方式，引入方式发生变化，全新版本请看文档

 **2.3.7**
 1.表格优化

 **2.3.6**
 1.解决渲染大数据不能排序问题

 **其他版本**
 .
 .
 .

# 当前版本BUG（等着下个版本修改）
 暂未发现

 # 2.3.6版本需要配置的实例（如果你不是用的2.3.6，就不需要看这个）
 # 报错(使用注意点, cdn方式请跳过)
  原因：内置组件采用JSX写法
```shell
    error  in ./node_modules/pl-table/package/src/virtual-table-header-render.js
    Module parse failed: Unexpected token (64:8)
    You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
    |   if (isGroup) this.$parent.isGroup = true;
    |   return (
    >         <table
    |     class="el-table__header"
    |       cellspacing="0"
```

# 解决上诉问题（cdn方式请跳过）
   **如果你使用的是vue-cli 2.x  配置如下**

   第一步:
   npm install babel-plugin-transform-vue-jsx babel-plugin-syntax-jsx --save-dev

   ![image](https://livelypeng.github.io/pl-table/assets/method2.png)

   第二步: （前提是必须安装了 babel-loader）

   ![image](https://livelypeng.github.io/pl-table/assets/method.png)


   **如果你使用的是vue-cli 3.x  配置如下**

   第一步:

   npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props --save-dev

   第二步:

   ![image](https://livelypeng.github.io/pl-table/assets/vue3method3.png)

   第三步:

   ![image](https://livelypeng.github.io/pl-table/assets/vue3method2.png)

