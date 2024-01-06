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
  scale(SCALE)
  board.draw()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  board.onResize(SCALE)
}
