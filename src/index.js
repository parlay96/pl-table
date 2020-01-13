import Table from '../package/table'

import './revise-el-table-mixins/table-extend'
import tableMixins from './revise-el-table-mixins/table.mixins'
if (!Table.mixins) {
  Table.mixins = []
}
Table.mixins.push(tableMixins)
