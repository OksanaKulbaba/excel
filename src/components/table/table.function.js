import {range} from '@/core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function shouldSelected(event) {
  return event.target.dataset.type === 'cell'
}
export function matrix($target, $current) {
  const current = $current.id(true)
  const target = $target.id(true)
  const rows = range(current.row, target.row)
  const cols = range(current.col, target.col)

  return cols.reduce((acc, col)=>{
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
export function nextSelector(key, {row, col}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      if (col>0) col--
      break
    case 'ArrowUp':
      if (row>0) row--
      break
  }
  return `[data-id="${row}:${col}"]`
}
