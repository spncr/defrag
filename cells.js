class Cells {
  cell
  cells
  cursor

  constructor(amount){
    this.cell = new Cell()
    this.cells = this.getFreshCells(amount)
    this.cursor = 0
    drawCell()
  }

  get length() {
    return this.cells.length
  }

  getCell(index) {
    return this.cells[index]
  }

  setCell(index, value){
    this.cells[index] = value
  }

  step() {
    if (this.cursor < this.length) {
      let currentCell = this.getCell(this.cursor)

      if (currentCell == 'belongs') {
        this.setCell(this.cursor, 'optimized')
      }

      this.cursor ++
    } else {
      this.cells = this.getFreshCells(this.length)
      this.cursor = 0
    }
  }

  getFreshCells(amount) {
    let cells = Array.from(
      {length: amount}, 
      () => {
        let roll = Math.floor(Math.random()*101)
        if (roll > 98) {
          return 'stuck'
        } else if (roll > 90) {
          return 'free'
        } else {
          return 'belongs'
        }
    })
    return cells
  }

  resize(size){
    if (this.length > size) {
      // cut it down to size
      this.cells = this.cells.slice(0, size)
    } else if (this.length < size) {
      // extend it to size
      this.cells = this.cells.concat(this.getFreshCells(size - this.length))
    }
  }

  draw(columns, rows) {
    for (let i = 0; i < this.length; i ++){
      let column = i % columns + 1
      let row = Math.floor( i / columns) + 1
      let x = column * 8 - 1
      let y = row * 10 - 3
      this.cell.draw(x, y, this.cells[i])
    }
  }
}

function drawCell(){
  console.log('oh yeah')
}