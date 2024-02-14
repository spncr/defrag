class Board {
  cells
  #w
  #h
  #columns
  #rows
  pause = false

  constructor(w, h,scale) {
    this.onResize(w, h, scale)
  }

  draw() {
    let curtain = select('.curtain')
    if (this.pause){
      this.drawBoard()
      curtain.show()
    } else {
      this.cells.step(this.#rows)
      this.drawBoard()
      curtain.hide()
    }
  }

  drawBoard(){
    this.drawFrame()
    push()
    clip(()=>{
      rect(7, this.#h - 6, this.#w, 6)
    }, { invert: true })
    this.cells.draw(this.#columns)
    pop()
  }

  drawFrame(){
    noStroke()
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
    rect (0 + (shrink/2) + offset, 0 + (shrink/2) + offset, this.#w - shrink, this.#h - shrink)
  }
  
  onResize(w, h, scale) {
    this.#w = w / scale
    this.#h = h / scale
    this.#columns = Math.floor((this.#w - 12) / 8)
    this.#rows = Math.floor((this.#h - 12) / 10 + 1)
    if (this.cells) this.cells.resize(this.#rows * this.#columns)
    else this.cells = new Cells(this.#columns * this.#rows)
  }
}


