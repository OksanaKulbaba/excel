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
  text(text) {
    if (typeof text ==='string') {
      this.$el.textContent = text
      return this;
    } else {
      if (this.$el.tagName.toLowerCase()==='input') {
        return this.$el.value.trim()
      }
      return this.$el.textContent.trim()
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
  focus() {
    this.$el.focus()
    return this
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  findAll(selector) {
    const test = new Array(...this.$el.querySelectorAll(selector))
    return test
  }
  addClass(className) {
    this.$el.classList.add(className)
  }
  removeClass(className) {
    this.$el.classList.remove(className)
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

