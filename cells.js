class Cells {
  cells
  cursor = 0
  #cellStates = {
    unoptimized : 'unoptimized',
    optimized : 'optimized',
    ignored : 'ignored',
    read : 'read',
    write : 'write'
  }

  get length() {
    return this.cells.length
  }

  constructor(amount){
    this.cells = this.getFreshCells(amount)
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

      if (currentCell == this.#cellStates.unoptimized) {
        this.setCell(this.cursor, this.#cellStates.optimized)
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
          return this.#cellStates.ignored
        } else if (roll > 10) {
          return this.#cellStates.unoptimized
        } else {
          return
        }
    })
    return cells
  }

  resize(size){
    if (this.length > size) {
      this.cells = this.cells.slice(0, size)
    } else if (this.length < size) {
      this.cells = this.cells.concat(this.getFreshCells(size - this.length))
    }
  }

  draw(columns, rows) {
    for (let i = 0; i < this.length; i ++){
      let column = i % columns + 1
      let row = Math.floor( i / columns) + 1
      let x = column * 8 - 1
      let y = row * 10 - 3
      this.#drawCell(x, y, this.cells[i])
    }
  }

  #drawCell (x, y, state) {
    if (state) {
      //outline
      fill('black')
      rect(x, y, 7, 9)
      
      switch (state){
        case this.#cellStates.unoptimized:
          this.#fillCell(x, y, 'cyan')
          break
        case this.#cellStates.optimized:
          this.#fillCell(x, y, 'cyan')
          fill('blue')
          for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 7; j++) {
              if ((i + j) % 2 == 0) { square(x + i, y + j, 1) }
            }
          }
          break
        case this.#cellStates.read:
          this.#fillCell(x, y, 'lime')
          break
        case this.#cellStates.write:
          this.#fillCell(x,y, 'red')
          break
        case this.#cellStates.ignored:
          this.#fillCell(x, y, 'white')
          fill ('black')
          rect (x + 3, y + 1, 3)
          fill ('red')
          rect (x + 5, y, 2)
          rect (x + 4, y + 1, 1)
          rect (x + 5, y + 2, 1)
          break
      }
    }
  }

  #fillCell (x, y, color = "purple") {
    fill(color)
    rect(x + 1, y + 1, 5, 7)
  }
}