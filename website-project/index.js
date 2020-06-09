import 'babel-polyfill' // 引入填充库,解决IE不能显示的问题
import Vue from 'vue'
import App from './app'
import router from './router'
import demoCard from './components/demo-card'
import highlightJs from 'highlight.js'
import './assets/styles/hightlight.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import plTable from 'pl-table'
console.log(plTable)
Vue.use(plTable)
Vue.use(ElementUI)
Vue.component(demoCard.name, demoCard)


router.afterEach(() => {
   Vue.nextTick(() => document.querySelectorAll('pre code').forEach(block=>highlightJs.highlightBlock(block)))
})

new Vue({
   ...App,
   router
}).$mount('#app')
