let board

let size = 2

function setup() {
  createCanvas(windowWidth, windowHeight)
  pixelDensity(1)
  board = new Board(windowWidth, windowHeight, size)
}

function draw() {
  scale(size)
  board.draw()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  board.onResize(windowWidth, windowHeight, size)
}

function keyPressed(){
  togglePause()
}

function touchEnded() {
  togglePause()
}

function mouseReleased() {
  togglePause()
  return false
}

function togglePause(){
  board.pause = !board.pause
}