class Cell {
  
  draw(x, y, type = 'free') {
    if (type == 'free') {
      fill('white')
      rect(x, y, 7, 9)
    }
    else {
      //outline
      fill('black')
      rect(x, y, 7, 9)
      
      if (type == 'belongs') {
        fill('cyan')
        this.drawColor(x, y)
      } 
      else if (type == 'optimized') {
        fill('cyan')
        this.drawColor(x,y)
        
        // checks
        fill('blue')
        for (let i = 1; i <= 5; i++) {
          for (let j = 1; j <= 7; j++) {
            if ((i + j) % 2 == 0) { square(x + i, y + j, 1) }
          }
        }
      } 
      else if (type == 'read') {
        fill('lime')
        this.drawColor(x,y)
      } 
      else if (type == 'write') {
        fill('red')
        this.drawColor(x,y)
      }
      else if (type == 'stuck') {
        fill ('white')
        this.drawColor(x,y)
        fill ('black')
        rect (x + 3, y + 1, 3)
        fill ('red')
        rect (x + 5, y, 2)
        rect (x + 4, y + 1, 1)
        rect (x + 5, y + 2, 1)
      }
    }
  }
  
  drawColor(x, y) {
    rect(x + 1, y + 1, 5, 7)
  }
}
