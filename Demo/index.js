import Vue from 'vue'
import App from './app'
import router from './router'
import demoCard from './components/demo-card'
import highlightJs from 'highlight.js'
import './assets/styles/hightlight.scss'
import 'pl-table/themes/index.css'
import 'pl-table/themes/plTableStyle.css'
import plTable from 'pl-table'
import Icon from '../package/icon'
Vue.use(plTable)
Vue.use(Icon)
Vue.component(demoCard.name, demoCard)


router.afterEach(() => {
   Vue.nextTick(() => document.querySelectorAll('pre code').forEach(block=>highlightJs.highlightBlock(block)))
})

new Vue({
   ...App,
   router
}).$mount('#app')
