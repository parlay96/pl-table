# pl-table  当前版本: "version": "2.5.0"
> 一个表格插件（完美解决万级数据渲染卡顿问题），过万数据点击全选卡顿，等等问题

> 重点： pl-table基于element-ui，在此感谢element-ui全体作者

> 重点:   流畅渲染万级数据并不会影响到 element-ui el-table组件的(原有)功能，并且新增了一些功能，具体请看属性配置

> 重点:  你的项目不是elementUi库在开发，而且用的其它UI库，或者没有用UI库，plTable一样可以用哦

> 注: pl-table 2.4.6起是个全新的版本，无需安装element，不在兼容element低版本（相当于pl-table指定了element版本），不需要element的包，请看文档，和下面的实例文件了解全新版本！

> 注: 当前pl-table是element的2.12.0的表格api， 但是并不是代表你需要安装element 2.12.0， 上面说到了，不需要你安装，你只需要知道表格对应的是element的2.12.0的api  你自己还是可以去安装element其他版本，并且去使用ele其他组件。 pl-table现在跟element没关系了，是因为我难得去写表格的api，就让你们自己去看element对应版本的api   因为pl-table api跟el-table api基本一致！

> 注： 2.3.6 需要配置（需要配置的实例，请看底部）   2.4.6及以上不需要配置，目前来说这2.3.6和2.4.6及以上的版本是稳定版本

> 注: 很多前端小伙伴再问，有了表格，那我怎么导出表格数据呢，来给你们个链接 https://github.com/livelyPeng/pl-export-excel

> author: pengLei （如有问题请加QQ：403802162）欢迎Star

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
  import { PlTable, PlTableColumn } from 'pl-table';
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
   **如果你使用 use-virtual（渲染大数据）请看下面， 当然如果你不用use-virtual属性（可以跳过须知），因为它就不存在下面的情况啦**

   1. 使用use-virtual渲染大数据属性: 暂不支持树形数据与懒加载与展开行

   2. 请看如下图
   ![image](https://livelypeng.github.io/pl-table/assets/tishi.png)


# pl-table表格的API
 **2.4.6及以上版本api**
  https://github.com/livelyPeng/pl-table/wiki/Component-API-2.4.6%E5%8F%8A%E4%BB%A5%E4%B8%8A%E7%89%88%E6%9C%AC

 **2.3.6及以下版本api**
  https://github.com/livelyPeng/pl-table/wiki/component-api-2.3.6%E5%8F%8A%E4%BB%A5%E4%B8%8B%E7%89%88%E6%9C%AC


# 实例文件（基础用法）
>  https://github.com/livelyPeng/pl-table/blob/master/Example/index.vue // npm方式实例
>  https://github.com/livelyPeng/pl-table/blob/master/Example/cdnIndex.html  // cdn方式实例


# 更新日志
**2.5.0**
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

 **2.3.5**
 1. 修改表格bug, 优化表格 2. 添加行被禁用选择样式功能

 **2.3.4**
 1. 添加cdn引入方式

 **2.3.2**
 1. 修改表格的bug

 **2.3.1**
 1. 修改表格的bug 2. 新增表格方法 3. 优化表格事件 4. 完善功能

 **2.3.0**
 1. 修改表格的bug

 **2.2.9**
 1. 修改表格的bug 2. 新增表格方法

 **2.2.8**
 1. 增加了表格自适应高度，不给高度（具体请看表格 height-switch属性）  2. 修改表格的bug

 **2.2.7**
 1. 添加自定义的合计计算方法 2. 修改ele表格的bug 3. 添加更多表格属性


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

