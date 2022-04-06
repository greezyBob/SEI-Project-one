function init() {

  //elements
  const grid = document.querySelector('.grid')
  const start = document.querySelector('#start')

  //grid creation
  const width = 10
  const height = 20
  const cellCount = width * height
  const cells = [] //this will hold all cells we create

  //variables
  let currentPosition = 0
  let countTimer
  let shapeType


  function createGrid() {
    // create all the cells using a loop
    // once created push to cells[] and append to grid
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      //cell numnber
      cell.innerText = i
      //add index as data attribute
      cell.id = i
      //add to grid
      grid.appendChild(cell)
      //push to cells[]
      cells.push(cell)
    }
  }
  createGrid()


  //execute
  function generateShape() {
    const rand = Math.floor(Math.random() * 7)
    if (rand === 0) {
      cells[4].classList.add('o')
      cells[4 + 1].classList.add('o')
      cells[4 + width].classList.add('o')
      cells[4 + width + 1].classList.add('o')
      shapeType = 'o'
      const shape = document.querySelectorAll('.o')
      shape.forEach(block => {
        currentPosition = block.id
        fallDown(currentPosition)
      })
    } else if (rand === 1) {
      cells[4].classList.add('i')
      cells[4 + width].classList.add('i')
      cells[4 + (2 * width)].classList.add('i')
      cells[4 + (3 * width)].classList.add('i')
      shapeType = 'i'
      const shape = document.querySelectorAll('.i')
      shape.forEach(block => {
        currentPosition = block.id
        fallDown(currentPosition)
      })
    } else if (rand === 2) {
      cells[4].classList.add('l')
      cells[4 + width].classList.add('l')
      cells[4 + width - 1].classList.add('l')
      cells[4 + width - 2].classList.add('l')
      shapeType = 'l'
      const shape = document.querySelectorAll('.l')
      shape.forEach(block => {
        currentPosition = block.id
        fallDown(currentPosition)
      })
    } else if (rand === 3) {
      cells[4].classList.add('j')
      cells[4 + width].classList.add('j')
      cells[4 + width + 1].classList.add('j')
      cells[4 + width + 2].classList.add('j')
      shapeType = 'j'
      const shape = document.querySelectorAll('.j')
      shape.forEach(block => {
        currentPosition = block.id
        fallDown(currentPosition)
      })
    } else if (rand === 4) {
      cells[4].classList.add('t')
      cells[4 + width].classList.add('t')
      cells[4 + width - 1].classList.add('t')
      cells[4 + width + 1].classList.add('t')
      const shape = document.querySelectorAll('.t')
      shapeType = 't'
      shape.forEach(block => {
        currentPosition = block.id
        fallDown(currentPosition)
      })
    } else if (rand === 5) {
      cells[4].classList.add('s')
      cells[4 + 1].classList.add('s')
      cells[4 + width].classList.add('s')
      cells[4 + width - 1].classList.add('s')
      shapeType = 's'
      const shape = document.querySelectorAll('.s')
      shape.forEach(block => {
        currentPosition = block.id
        fallDown(currentPosition)
      })
    } else if (rand === 6) {
      cells[4].classList.add('z')
      cells[4 - 1].classList.add('z')
      cells[4 + width].classList.add('z')
      cells[4 + width + 1].classList.add('z')
      shapeType = 'z'
      const shape = document.querySelectorAll('.z')
      shape.forEach(block => {
        currentPosition = block.id
        fallDown(currentPosition)
      })
    }
  }

  function fallDown() {
    countTimer = setInterval(() => {
      removeClass()

    }, 1000)
  }

  function removeClass() {
    for (let i = 0; i < cellCount; i++) {
      if (cells[i].classList.contains(shapeType)) {
        cells[i].classList.remove(shapeType)
      }
    }
  }

  addClass(){

  }



  start.addEventListener('click', generateShape)

}

window.addEventListener('DOMContentLoaded', init)