export default function render (h) {
  const columnsHidden = this.columns.map((column, index) => this.isColumnHidden(index));
  let rows = this.data;
  if (this.store.states.lazy && Object.keys(this.store.states.lazyTreeNodeMap).length) {
    rows = rows.reduce((prev, item) => {
      prev.push(item);
      const rowKey = this.store.table.getRowKey(item);
      const parent = this.store.states.treeData[rowKey];
      if (parent && parent.children && parent.hasChildren) {
        const tmp = [];
        const traverse = (children) => {
          if (!children) return;
          children.forEach(key => {
            tmp.push(this.store.states.lazyTreeNodeMap[key]);
            if (this.store.states.treeData[key]) {
              traverse(this.store.states.treeData[key].children);
            }
          });
        };
        traverse(parent.children);
        prev = prev.concat(tmp);
      }
      return prev;
    }, []);
  }
  return (
    <div
      style={[{height: `${this.table.virtualBodyHeight}px`}]}
      class={['el-table__virtual-wrapper', {'el-table--fixed__virtual-wrapper': this.fixed}]}
      v-mousewheel={this.table.handleFixedMousewheel}
    >
      <div style={[{transform: `translateY(${this.table.innerTop}px)`}]}>
        <table
          class="el-table__body"
          cellspacing="0"
          cellpadding="0"
          border="0">
          <colgroup>
            {
              this._l(this.columns, (column, cellIndex) => columnsHidden[cellIndex] && this.fixed ? '' : <col name={ column.id } />)
            }
          </colgroup>
          <tbody>
          {
            this._l(rows, (row, index) => {
              const $index = this.getIndex(index)
              const rowKey = this.table.rowKey ? this.getKeyOfRow(row, $index) : $index;
              const treeNode = this.treeData && this.treeData[rowKey];
              const rowClasses = this.getRowClass(row, $index);
              if (treeNode) {
                rowClasses.push('el-table__row--level-' + treeNode.level);
              }
              const tr = (<tr
                v-show={ treeNode ? treeNode.display : true }
                style={ this.rowStyle ? this.getRowStyle(row, $index) : null }
                key={ rowKey }
                on-dblclick={ ($event) => this.handleDoubleClick($event, row) }
                on-click={ ($event) => this.handleClick($event, row) }
                on-contextmenu={ ($event) => this.handleContextMenu($event, row) }
                on-mouseenter={ _ => this.handleMouseEnter($index) }
                on-mouseleave={ _ => this.handleMouseLeave() }
                class={ rowClasses }>
                {
                  this._l(this.columns, (column, cellIndex) => {
                    const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex);
                    if (!rowspan || !colspan  || (columnsHidden[cellIndex] && this.fixed)) {
                      return '';
                    } else {
                      const columnData = Object.assign({}, column);
                      if (colspan !== 1) {
                        columnData.realWidth = columnData.realWidth * colspan;
                      }
                      const data = {
                        store: this.store,
                        _self: this.context || this.table.$vnode.context,
                        column: columnData,
                        row,
                        $index
                      };
                      if (cellIndex === this.firstDefaultColumnIndex && treeNode) {
                        data.treeNode = {
                          hasChildren: treeNode.hasChildren || (treeNode.children && treeNode.children.length),
                          expanded: treeNode.expanded,
                          indent: treeNode.level * this.treeIndent,
                          level: treeNode.level,
                          loaded: treeNode.loaded,
                          rowKey
                        };
                      }
                      return (
                        <td
                          style={ [{height: this.table.rowHeight + 'px'}, this.getCellStyle($index, cellIndex, row, column)] }
                          class={ this.getCellClass($index, cellIndex, row, column) }
                          rowspan={ rowspan }
                          colspan={ colspan }
                          on-mouseenter={ ($event) => this.handleCellMouseEnter($event, row) }
                          on-mouseleave={ this.handleCellMouseLeave }>
                          {
                            column.renderCell.call(
                              this._renderProxy,
                              h,
                              data,
                              columnsHidden[cellIndex]
                            )
                          }
                        </td>
                      );
                    }
                  })
                }
              </tr>);
              if (this.hasExpandColumn && this.store.isRowExpanded(row)) {
                return [
                  tr,
                  <tr>
                    <td colspan={ this.columns.length } class="el-table__expanded-cell">
                      { this.table.renderExpanded ? this.table.renderExpanded(h, { row, $index, store: this.store }) : ''}
                    </td>
                  </tr>
                ];
              } else {
                return tr;
              }
            }).concat(
              <el-tooltip effect={ this.table.tooltipEffect } popperClass="plTableTooltip" placement={ this.table.tooltipPlacement } ref="tooltip" content={ this.tooltipContent }></el-tooltip>
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
