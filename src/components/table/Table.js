import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from '@/components/table/table.tamplate';
import {resizeHandler} from '@/components/table/table.resize';
import {matrix, shouldResize} from '@/components/table/table.function';
import {shouldSelected, nextSelector} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@/core/dom';
export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }
  toHTML() {
    return createTable()
  }
  prepare() {
  }

  init() {
    super.init();
    this.selection = new TableSelection()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.selected($cell)

    this.selectCell($cell)
    this.$on('formula:input', text =>{
      this.selection.current.text(text)
    })
    this.$on('formula:enter', () => this.selection.current.focus())
  }
  selectCell($cell) {
    this.$emit('table:selected', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (shouldSelected(event)) {
      if (event.shiftKey) {
        const $cells = matrix($(event.target), this.selection.current)
            .map(el =>(this.$root.find(`[data-id="${el}"]`)))
        this.selection.selectedAll($cells)
      } else {
        this.selection.selected($(event.target))
        this.selectCell($(event.target))
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.selected($next)
      this.selectCell($next)
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}

