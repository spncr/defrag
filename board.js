class Board {

  constructor(scale) {
    this.scale = scale
    this.w = windowWidth/scale
    this.h = windowHeight/scale
    this.cell = new Cell()
    this.calculateSize()
    this.cells = this.getFreshCells(this.size)
  }
  
  draw(){
    this.drawFrame()
    this.drawCells()
  }
  drawFrame(){
    this.drawRect('black')
    this.drawRect('silver', 1, -0.5)
    this.drawRect('gray', 2)
    this.drawRect('white', 3, -0.5)
    this.drawRect('silver', 4)
    this.drawRect('white', 8)
    this.drawRect('gray', 9, -0.5)
    this.drawRect('silver', 10)
    this.drawRect('black', 11, -0.5)
    this.drawRect('white', 12)
  }
  
  drawRect(color_string, shrink = 0, offset = 0) {
    fill(color_string)
    rect (0 + (shrink/2) + offset, 0 + (shrink/2) + offset, this.w - shrink, this.h - shrink)
  }
  
  onResize() {
    this.w = windowWidth/this.scale
    this.h = windowHeight/this.scale
    let old_size = this.size
    this.calculateSize()
    if (old_size > this.size) {
      let amount_to_delete = this.old_size - this.size
      this.cells.splice(this.size - amount_to_delete, amount_to_delete)
    } else if (old_size < this.size) {
      let amount_to_generate = this.size - old_size
      this.cells = this.cells.concat(this.getFreshCells(amount_to_generate))
    }

  }
  
  calculateSize(){
    this.columns = Math.floor((this.w - 12) / 8)
    this.rows = Math.floor((this.h - 12) / 10 + 1)
    this.size = this.rows * this.columns
  }
  
  fillCells() {
    this.calculateSize()
    let options = ['free', 'belongs', 'optimized', 'read', 'write', 'stuck']
    this.cells = Array.from({length: this.columns * this.rows}, () => options[Math.floor(Math.random()*options.length)])
  }

  getFreshCells(amount) {
    let cells = Array.from({length: amount}, 
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
    console.log("fresh cells:", cells)
    return cells
  }
  
  drawCells() {
    let x = 7
    let y = 7
    this.cell.draw(x, y, this.cells[1])
    push()
    clip(()=>{
      rect(7, this.h - 6, this.w, 6)
    }, { invert: true })
    for (let column = 1; column <= this.columns; column++) {
      for (let row = 1; row <= this.rows; row++){
        this.cell.draw(
          column * 8 - 1, 
          row * 10 - 3, 
          this.cells[row * column - 1])
      }
    }
    pop()
  }
}
