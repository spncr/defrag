let cell 
let board
const SCALE = 1.2

function setup() {
  createCanvas(windowWidth, windowHeight)
  pixelDensity(1)
  board = new Board(SCALE)
  cell = new Cell()
}

function draw() {
  scale(SCALE)
  board.draw()
  scale(1/SCALE)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  board.resize()
}
