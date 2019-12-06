import './src/index'
import PlTable from './src/components'
import PlTableColumn from './package/table-column'
const components = [
  PlTable,
  PlTableColumn
]
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '2.4.5',
  install,
  PlTable,
  PlTableColumn
}
