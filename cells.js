class Cells {

  constructor(amount){
    this.cell = new Cell()
    this.cells = this.getFreshCells(amount)
  }

  get length() {
    return this.cells.length
  }

  getFreshCells(amount) {
    let cells = Array.from(
      {length: amount}, 
      () => {
        let roll = Math.floor(Math.random()*101)
        if (roll > 98){
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
    console.log(this.length)
  }

  draw(columns, rows) {
    for (let column = 1; column <= columns; column++) {
      for (let row = 1; row <= rows; row++){
        this.cell.draw(
          column * 8 - 1, 
          row * 10 - 3, 
          this.cells[row * column - 1])
      }
    }
  }
}