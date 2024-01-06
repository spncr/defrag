class Board {
  #w
  #h
  #columns
  #rows
  #cells

  constructor(scale) {
    this.#w = windowWidth/scale
    this.#h = windowHeight/scale
    this.#columns = Math.floor((this.#w - 12) / 8)
    this.#rows = Math.floor((this.#h - 12) / 10 + 1)
    this.#cells = new Cells(this.#columns * this.#rows)
  }

  draw() {
    noStroke()
    this.drawFrame()
    push()
    clip(()=>{
      rect(7, this.#h - 6, this.#w, 6)
    }, { invert: true })
    this.#cells.draw(this.#columns, this.#rows)
    pop()
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
    rect (0 + (shrink/2) + offset, 0 + (shrink/2) + offset, this.#w - shrink, this.#h - shrink)
  }
  
  onResize(scale) {
    this.#w = windowWidth / scale
    this.#h = windowHeight / scale
    this.#columns = Math.floor((this.#w - 12) / 8)
    this.#rows = Math.floor((this.#h - 12) / 10 + 1)
    console.log(this.#columns, " columns & ", this.#rows, "rows = ")
    this.#cells.resize(this.#rows * this.#columns)
  }
}
