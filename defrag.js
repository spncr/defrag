let board
const SCALE = 2

function setup() {
  createCanvas(windowWidth, windowHeight)
  pixelDensity(1)
  board = new Board(SCALE)
}

function draw() {
  board.cells.step()
  scale(SCALE)
  board.draw()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  board.onResize(SCALE)
}
