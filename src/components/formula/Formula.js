import {ExcelComponent} from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    }
    )
  }
    static className = 'excel__formula'


    toHTML() {
      return `
    <div class="info">fx</div>

    <div class="input" contenteditable></div>`
    }
    onInput(event) {
      console.log(this.$root)
      console.log('Formula: onInit', event.target.textContent.trim())
    }
}