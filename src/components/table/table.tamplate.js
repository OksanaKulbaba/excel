
function toChar(_, index) {
  return String.fromCharCode(index + CODED.A)
}

function toCell() {
  return ` <div class="cell" contenteditable></div>`
}

function toColumn(char) {
  return ` <div class="column">
                ${char}
            </div>`
}

function createRow(index, content) {
  return ` <div class="row">
        <div class="row-info">${index ? index : ''}</div>
        <div class="row-data">${content}</div>
</div>`
}

const CODED = {
  A: 65,
  Z: 90
}

export function createTable(countRow = 20) {
  const countColumn = CODED.Z-CODED.A +1
  const rows =[]
  const columns = new Array(countColumn)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  rows.push(createRow(null, columns))

  for (let i = 0; i<countRow; i++) {
    const columnsCell = new Array(countColumn)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i +1, columnsCell))
  }

  return rows.join('')
}
