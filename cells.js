const MAX_BATCH = 20
const MIN_BATCH = 3

class Cells {
  cells
  cursor = 0
  clipboard = []
  stepState = 'crawl'
  batchSize
  nextIgnored
  lastIgnored

  #cellStates = {
    unoptimized : 'unoptimized',
    optimized : 'optimized',
    ignore : 'ignore',
    read : 'read',
    write : 'write',
  }

  #stepStates = {
    crawl : 'crawl',
    read : 'read',
    clear : 'clear',
    write : 'write',
    resume: 'resume'
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

  setCells(batch, value = undefined){
    for (const i of batch){
      if (value) this.setCell(i, value)
      else delete this.cells[i]
    }
  }

  setCellRange(from, to, value){
    for (let i = from; i < to; i ++){
      this.setCell(i, value)
    }
  }

  step() {
    if (this.cursor < this.length) {
      switch (this.stepState) {
        case this.#stepStates.crawl:
          frameRate(30)
          let currentCell = this.getCell(this.cursor)

          if (currentCell === this.#cellStates.unoptimized) {
            this.setCell(this.cursor, this.#cellStates.optimized)
            this.cursor ++
          } else if (currentCell === this.#cellStates.ignore){
            this.cursor ++
          } else {
            this.stepState = this.#stepStates.read
          }
          break

        case this.#stepStates.read:
          frameRate(2)

          this.batchSize = Math.floor(Math.random() * (MAX_BATCH - MIN_BATCH + 1) + MIN_BATCH)
          let cursor = this.cursor + 1

          if (this.cursor > this.nextIgnored) delete this.nextIgnored
          if (this.cursor > this.lastIgnored) delete this.lastIgnored

          if (this.lastIgnored && this.nextIgnored) {
            cursor = this.lastIgnored + 1
            this.batchSize = Math.min(this.nextIgnored - this.cursor, MAX_BATCH)
          } else if (this.nextIgnored) {
            cursor = this.nextIgnored  + 1
            this.batchSize = Math.min(this.nextIgnored - this.cursor, MAX_BATCH)
          }  

          while (this.clipboard.length < this.batchSize) {
            let cell = this.getCell(cursor)
            if (cell === this.#cellStates.unoptimized) {
              this.clipboard.push(cursor)
            } else if (cell === this.#cellStates.ignore) {
              this.batchSize = this.clipboard.length
              if (!this.nextIgnored) this.nextIgnored = cursor
              else this.lastIgnored = cursor
            }
            cursor ++
            if (cursor >= this.length) {
              this.resetBoard()
              this.batchSize = this.clipboard.length
            }
          }

          this.setCells(this.clipboard, this.#cellStates.read)
          this.stepState = this.#stepStates.clear
          break

        case this.#stepStates.clear:
          frameRate(10)
          this.setCells(this.clipboard)
          this.stepState = this.#stepStates.write
          break

        case this.#stepStates.write:
          frameRate(1)
          this.setCellRange(
            this.cursor, 
            this.cursor + this.clipboard.length, 
            this.#cellStates.write)
          this.stepState = this.#stepStates.resume
          break

        case this.#stepStates.resume:
          frameRate(6)
          this.setCellRange(
            this.cursor, 
            this.cursor + this.clipboard.length, 
            this.#cellStates.unoptimized)
          this.clipboard = []
          this.stepState = this.#stepStates.crawl
          break
      }
    } else {
      this.resetBoard()
    }
  }

  getFreshCells(amount) {
    let cells = Array.from(
      {length: amount}, 
      () => {
        let roll = Math.floor(Math.random()*101)
        if (roll > 98) {
          return this.#cellStates.ignore
        } else if (roll > 25) {
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

  resetBoard(){
    this.cells = this.getFreshCells(this.length)
    this.cursor = 0
  }

  draw(columns) {
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
        case this.#cellStates.ignore:
          this.#fillCell(x, y, 'white')
          fill ('black')
          rect (x + 3, y + 1, 3)
          fill ('red')
          rect (x + 5, y, 2)
          rect (x + 4, y + 1, 1)
          rect (x + 5, y + 2, 1)
          break
        default:
          console.log('erroneous state in drawCell method: ', state)
      }
    }
  }

  #fillCell (x, y, color) {
    fill(color)
    rect(x + 1, y + 1, 5, 7)
  }
}