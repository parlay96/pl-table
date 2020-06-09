# pl-table  最新版本: "version": "2.7.5"
> 最新: pl-table大数据树表格的到来

> 重点: 一个表格插件（完美解决万级数据渲染卡顿问题），过万数据点击全选卡顿，等等问题

> 重点： pl-table基于element-ui，在此感谢element-ui全体作者

> 重点:  流畅渲染万级数据并不会影响到 element-ui el-table组件的(原有)功能，并且新增了一些功能，具体请看属性配置

> 重点: 基于element-ui但是不代表你需要安装element-ui才能使用pl-table，你可以不安装任何UI库，就可以使用pl-table。但是必须在集成vue框架下使用！

> 注: 看表格实例效果代码去看element Table 表格效果代码（比如你不知道怎么合并列，合计,多级表头，怎么写请你去看element表格）

> 注: 有了表格,怎么导出表格数据为excel并且带样式呢?,请点击https://github.com/livelyPeng/pl-export-excel

> 注:  关于项目中使用pl-table打包后文件体积大，如何优化问题，请加下面群了解！

> author: pl （更多问题请加入pl-table交流群吧）感谢点击上方的Star！！！

> QQ交流1群: 675286117已满员
> QQ交流2群: 939125115新群未满员

[点击查看pl-table在线demo效果](https://livelypeng.github.io/pl-table/website-project/dist/index.html)

# 安装方式 and 引入方式
  ** npm方式安装 **
``` javascript
  // npm i pl-table

  // npm引入方式 如下
  // main.js
  import plTable from 'pl-table'

  import 'pl-table/themes/index.css' // 引入样式（必须引入)，vuecli3.0不需要配置，cli2.0请查看webpack是否配置了url-loader对woff，ttf文件的引用,不配置会报错哦

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
  // 真实项目不建议你直接引入  <script src="https://unpkg.com/pl-table/lib/index.js"></script>这样去引如会直接下最新版本，如果你的项目打包发     // 布了，然后遇见pl-table大更新 你可能项目会报错。
  // 推荐你这样引入： https://unpkg.com/pl-table@2.7.4/lib/index.js   加入版本号！
```


# 用前须知（必读）
   1. pl-table不使用use-virtual属性，整个表格功能性的东西都是element表格，除了样式
   2. pl-table 开启use-virtual虚拟可以支持微小的合并行|列 如2列 2行，支持多级头
   3. plx-table-grid同时虚拟不支持合并行|列，不支持多级头，非必要不推荐使用X + Y同时虚拟

# pl-table表格的API
  https://github.com/livelyPeng/pl-table/wiki/pl-table-api

# plx-table-grid表格的API（对列没有刚需的，没必要用这个，用上面的pl-table就行, 列没有几百列不需要用这个）
  https://github.com/livelyPeng/pl-table/wiki/plx-table-grid-APi

# 实例文件（基础用法）
>  https://github.com/livelyPeng/pl-table/blob/master/website-project/testFile/index.vue // npm方式实例

>  https://github.com/livelyPeng/pl-table/blob/master/website-project/testFile/cdn.html // cdn方式实例


# 更新日志
**2.7.5**
1. 修改合计
2. 新增属性
3. 新增pl-table大数据树表格
4. 重构代码
5. 修改BUG


**2.7.4**
1. 解决动态加载数据，当滚动条未在顶部时，加载的数据只显示3条
2. 新增表格最大高度属性，max-height，你可以添加如此属性
3. 优化表格
4. 解决高度异步赋值，导致表格高度计算错误问题
5. 解决缓存组件，不能记录之前滚动条的滚动距离
6. 之前绑定表格数据是datas, 现在是data属性
7. 添加分页组件
8. 新增表格滚动底部方法
9. 解决pagingScrollTopLeft方法的BUG

 **其他版本**
 .
 .
 .

# 当前版本BUG（等着下个版本修改）
 暂未发现

# 提示注意点 编辑型表格
``` javascript
Simple love 10:20:16
 表格是编辑型表格，就是那种单元格全是输入框，下拉框，时间选择等的element组件或者标签或者其他UI库组件。对于编辑型表格，不要一次性加载出来

Simple love 10:20:41
麻烦去搞懂下为啥卡的原理

Simple love 10:21:14
20列，加上需要滚动每行算10列吧  每个单元格是一个输入框  下拉框组件  组件里面还有节点  自己想想  你这一屏 多少节点

Simple love 10:21:29
那么程序需要去渲染你这样的节点 需要时间不

Simple love 10:23:02

你不能让他点击行 去渲染当前行为编辑型表格？ 不能重产品上去解决？  就是不要让他一出来就是全部渲染输入框 编辑型表格
```

