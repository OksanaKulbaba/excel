import {$} from '@/core/dom';

export function resizeHandler($root, event) {
  const typeResize = event.target.dataset.resize
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type = "resizeble"]')
  const cords = $parent.getCords()
  const sideProp = typeResize ==='col'? 'bottom':'right'
  const cells = $root.findAll(`[data-coll="${$parent.data.coll}"]`)
  let value
  $resizer.css({
    opacity: '1',
    [sideProp]: '-5000px',
  })
  document.onmousemove = (e) => {
    if (typeResize === 'col') {
      const deltaX = e.pageX - cords.right
      value = cords.width + deltaX
      $resizer.css({
        right: -deltaX + 'px',
      })
    } else {
      const deltaY = e.pageY - cords.bottom
      value = cords.height + deltaY
      $resizer.css({
        bottom: - deltaY +'px',
      })
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    if (typeResize === 'col') {
      const style = {width: `${value}px`}
      $parent.css(style)
      cells.forEach(el =>{
        $(el).css(style)
      })
    } else {
      $parent.css({height: value + 'px'})
    }
    $resizer.css({
      opacity: '0',
      bottom: '0',
      right: '0'
    })
  }
}
