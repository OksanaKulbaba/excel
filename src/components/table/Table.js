import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from '@/components/table/table.tamplate';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.function';
export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }
  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}
