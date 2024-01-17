let board
const SCALE = 2

function setup() {
  createCanvas(windowWidth, windowHeight)
  pixelDensity(1)
  board = new Board(SCALE)
  frameRate(30)
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
