
function toChar(_, index) {
  return String.fromCharCode(index + CODED.A)
}

function toCell(_, i) {
  return ` <div class="cell" contenteditable data-countC = "${i}"></div>`
}

function toColumn(char, i) {
  return ` <div class="column" data-type = "resizeble" data-countC = "${i}">
                ${char}
                <div class="col-resize" data-resize = "col"></div>
            </div>`
}

function createRow(index, content) {
  const resizer = index ? `<div class="row-resize" data-resize ="row"></div>`:''
  return ` <div class="row" data-type = "resizeble" >
        <div class="row-info" >
        ${index ? index : ''}
        ${resizer}
        </div>
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
