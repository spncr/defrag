let cell 
let board
const SCALE = 4

function setup() {
  createCanvas(windowWidth, windowHeight)
  pixelDensity(1)
  board = new Board(SCALE)
  cell = new Cell()
}

function draw() {
  background(125)
  scale(SCALE)
  board.draw()
  cell.draw(7, 17, 'belongs')
  cell.draw(7, 27, 'read')
  cell.draw(7, 37, 'write')
  cell.draw(7, 47, 'stuck')
  cell.draw(7, 57, 'optimized')

  scale(1/SCALE)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  board.resize()
}
