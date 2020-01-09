const avgFunction = (_this) => {
  let fenceSums = []
  function cacl(arr, callback) {
    let ret;
    for (let i=0; i<arr.length;i++) {
      ret = callback(arr[i], ret);
    }
    return ret;
  }
  Array.prototype.sum = function () {
    return cacl(this, function (item, sum) {
      if (typeof (sum) == 'undefined') {
        return item;
      }
      else {
        return sum += item;
      }
    });
  };
  Array.prototype.avg = function () {
    if (this.length == 0) {
      return 0;
    }
    return this.sum(this) / this.length;
  };
  _this.columns.forEach((column, index) => {
    if (index === 0) {
      fenceSums[index] = '平均值';
      return;
    }
    const values = _this.store.states.data.map(item => Number(item[column.property]));
    const precisions = [];
    let notNumber = true;
    values.forEach(value => {
      if (!isNaN(value)) {
        notNumber = false;
        let decimal = ('' + value).split('.')[1];
        precisions.push(decimal ? decimal.length : 0);
      }
    });
    const precision = Math.max.apply(null, precisions);
    if (!notNumber) {
      fenceSums[index] = values.avg()
    } else {
      fenceSums[index] = '';
    }
  });
  return fenceSums
}

export default function render(h) {
  // 合计
  let sums = [];
  if (this.summaryMethod) {
    sums = this.summaryMethod({ columns: this.columns, data: this.store.states.data });
  } else {
    this.columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = this.sumText;
        return;
      }
      const values = this.store.states.data.map(item => Number(item[column.property]));
      const precisions = [];
      let notNumber = true;
      values.forEach(value => {
        if (!isNaN(value)) {
          notNumber = false;
          let decimal = ('' + value).split('.')[1];
          precisions.push(decimal ? decimal.length : 0);
        }
      });
      const precision = Math.max.apply(null, precisions);
      if (!notNumber) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return parseFloat((prev + curr).toFixed(Math.min(precision, 20)));
          } else {
            return prev;
          }
        }, 0);
      } else {
        sums[index] = '';
      }
    });
  }
  // 新添加的计算围栏方法
  let fenceSums = []
  if (typeof this.table.fenceMethod === 'function' && this.table.fenceMethod) {
    fenceSums = this.table.fenceMethod({ columns: this.columns, data: this.store.states.data });
    if (!fenceSums) {
      fenceSums = avgFunction(this)
    }
  } else {
    fenceSums = avgFunction(this)
  }
  return (
    <div class="plTbaleTotal">
      <table
        class="el-table__footer"
        cellSpacing="0"
        cellPadding="0"
        border="0">
        <colgroup>
          {
            this.columns.map(column => <col name={column.id} key={column.id}/>)
          }
          {
            this.hasGutter ? <col name="gutter"/> : ''
          }
        </colgroup>
        <tbody class={[{'has-gutter': this.hasGutter}]}>
        <tr>
          {
            this.columns.map((column, cellIndex) => <td
              key={cellIndex}
              colSpan={column.colSpan}
              rowSpan={column.rowSpan}
              class={this.getRowClasses(column, cellIndex)}>
              <div class={['cell', column.labelclass]}>
                {
                  sums[cellIndex]
                }
              </div>
            </td>)
          }
          {
            this.hasGutter ? <th class="gutter"></th> : ''
          }
        </tr>
        </tbody>
      </table>
      <table
        class="el-table__footer el-table__footer-two"
        cellSpacing="0"
        cellPadding="0"
        border="0">
        <colgroup>
          {
            this.columns.map(column => <col name={column.id} key={column.id}/>)
          }
          {
            this.hasGutter ? <col name="gutter"/> : ''
          }
        </colgroup>
        <tbody class={[{'has-gutter': this.hasGutter}]}>
        <tr>
          {
            this.columns.map((column, cellIndex) => <td
              key={cellIndex}
              colSpan={column.colSpan}
              rowSpan={column.rowSpan}
              class={this.getRowClasses(column, cellIndex)}>
              <div class={['cell', column.labelclass]}>
                {
                  fenceSums[cellIndex]
                }
              </div>
            </td>)
          }
          {
            this.hasGutter ? <th class="gutter"></th> : ''
          }
        </tr>
        </tbody>
      </table>
    </div>
  );
}
