let cell 
let board
const SCALE = 4

function setup() {
  createCanvas(windowWidth, windowHeight)
  pixelDensity(1)
  board = new Board(SCALE)
  cell = new Cell()
  frameRate(5)
}

function draw() {
  // frameRate(Math.floor(Math.random()* 6 + 6))
  // console.log(frameRate())
  board.cells.step()
  scale(SCALE)
  board.draw()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  board.onResize(SCALE)
}
