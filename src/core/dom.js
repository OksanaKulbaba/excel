class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
  }

  html(html) {
    if (typeof html ==='string') {
      this.$el.innerHTML = html
      return this;
    } else {
      return this.$el.outerHTML.trim()
    }
  }

  clear() {
    this.html('')
    return this
  }

  on(eventName, eventTarget) {
    return this.$el.addEventListener(eventName, eventTarget)
  }

  off(eventName, eventTarget) {
    return this.$el.removeEventListener(eventName, eventTarget)
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    }
    this.$el.appendChild(node)
    return this
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCords() {
    return this.$el.getBoundingClientRect()
  }
  get data() {
    return this.$el.dataset
  }
  getElementsByClassName(className) {
    return this.$el.getElementsByClassName(className)
  }

  css(styles= {}) {
    Object.keys(styles)
        .forEach(key => this.$el.style[key] = styles[key])
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

