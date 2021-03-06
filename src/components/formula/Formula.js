import {ExcelComponent} from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    }
    )
  }
    static className = 'excel__formula'
    toHTML() {
      return `
    <div class="info">fx</div>

    <div id = "formula" class="input" contenteditable></div>`
    }
    init() {
      super.init()
      this.$formula = this.$root.find('#formula')
      this.$on('table:selected', $cell => this.$formula.text($cell.text()))
      this.$on('table:input', $cell => this.$formula.text($cell.text()))
      this.$on('table:mousedown', $cell => this.$formula.text($cell.text()))
    }

    onInput(event) {
      const text = event.target.textContent
      this.$emit('formula:input', text)
    }
    onKeydown(event) {
      const keys = ['Enter', 'Tab']
      if (keys.includes(event.key)) {
        event.preventDefault()
        this.$emit('formula:enter')
      }
    }
}
