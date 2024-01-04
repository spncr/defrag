class Board {

  constructor(scale) {
    this.scale = scale
    this.w = windowWidth/scale
    this.h = windowHeight/scale
    this.cell = new Cell()
    this.cells = []
    this.fillCells()
  }
  
  draw(){
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
    this.drawCells()
}
  
  drawRect(color_string, shrink = 0, offset = 0) {
    fill(color_string)
    rect (0 + (shrink/2) + offset, 0 + (shrink/2) + offset, this.w - shrink, this.h - shrink)
  }
  
  resize() {
    this.w = windowWidth/this.scale
    this.h = windowHeight/this.scale
  }
  
  fillCells() {
    let columns = Math.floor((this.w - 14) / 8)
    let rows = Math.floor((this.h - 14) / 10)
    let options = ['free', 'belongs', 'optimized', 'read', 'write', 'stuck']
    this.cells = Array.from({length: columns * rows}, ()=> options[Math.floor(Math.random()*options.length)])
  }
  
  drawCells() {
    let columns = Math.floor((this.w - 14) / 8)
    let rows = Math.floor((this.h - 14) / 10)
    let x = 7
    let y = 7
    this.cell.draw(x, y, this.cells[1])
    //for (c in this.cells) {
    //  this.cell.draw(x, y, c)
    //}
  }
}
