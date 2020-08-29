import {capitalize} from '@/core/utils';

export class DomListener {
  constructor($root, listeners= []) {
    if (!$root) {
      throw new Error('its dont correct root')
    }
    this.$root = $root
    this.listeners = listeners
  }

  innitDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethod(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`This ${method} dont implement in ${name} Component`)
      }
      this[method] = this[method].bind(this)
      return this.$root.on(listener, this[method])
    })
  }
  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethod(listener)
      return this.$root.off(listener, this[method])
    })
  }
}

function getMethod(nameEvent) {
  return 'on' + capitalize(nameEvent)
}

