function init() {

  //elements
  const grid = document.querySelector('.grid')
  const start = document.querySelector('#start')

  //grid creation
  const width = 10
  const height = 10
  const cellCount = width * height
  const cells = [] //this will hold all cells we create

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

  //?variables
  let currentPosition = 0
  let countTimer
  let shapeType
  let shapeNode
  let shape

  //?execute
  //shape generation
  function generateShape() {
    clearInterval(countTimer)
    const rand = Math.floor(Math.random() * 7)
    if (rand === 0) {
      cells[4].classList.add('o')
      cells[4 + 1].classList.add('o')
      cells[4 + width].classList.add('o')
      cells[4 + width + 1].classList.add('o')
      shapeType = 'o'
      shapeNode = document.querySelectorAll('.o')
      shape = Array.from(shapeNode)
      fallDown()
    } else if (rand === 1) {
      cells[4].classList.add('i')
      cells[4 + width].classList.add('i')
      cells[4 + (2 * width)].classList.add('i')
      cells[4 + (3 * width)].classList.add('i')
      shapeType = 'i'
      shapeNode = document.querySelectorAll('.i')
      shape = Array.from(shapeNode)
      fallDown()
    } else if (rand === 2) {
      cells[4].classList.add('l')
      cells[4 + width].classList.add('l')
      cells[4 + width - 1].classList.add('l')
      cells[4 + width - 2].classList.add('l')
      shapeType = 'l'
      shapeNode = document.querySelectorAll('.l')
      shape = Array.from(shapeNode)
      fallDown()
    } else if (rand === 3) {
      cells[4].classList.add('j')
      cells[4 + width].classList.add('j')
      cells[4 + width + 1].classList.add('j')
      cells[4 + width + 2].classList.add('j')
      shapeType = 'j'
      shapeNode = document.querySelectorAll('.j')
      shape = Array.from(shapeNode)
      fallDown()
    } else if (rand === 4) {
      cells[4].classList.add('t')
      cells[4 + width].classList.add('t')
      cells[4 + width - 1].classList.add('t')
      cells[4 + width + 1].classList.add('t')
      shapeType = 't'
      shapeNode = document.querySelectorAll('.t')
      shape = Array.from(shapeNode)
      fallDown()
    } else if (rand === 5) {
      cells[4].classList.add('s')
      cells[4 + 1].classList.add('s')
      cells[4 + width].classList.add('s')
      cells[4 + width - 1].classList.add('s')
      shapeType = 's'
      shapeNode = document.querySelectorAll('.s')
      shape = Array.from(shapeNode)
      fallDown()
    } else if (rand === 6) {
      cells[4].classList.add('z')
      cells[4 - 1].classList.add('z')
      cells[4 + width].classList.add('z')
      cells[4 + width + 1].classList.add('z')
      shapeType = 'z'
      shapeNode = document.querySelectorAll('.z')
      shape = Array.from(shapeNode)
      fallDown()

    }
  }

  //fallDown
  function fallDown() {
    countTimer = setInterval(() => {
      if (shape.length > 0) {
        for (let i = shape.length - 1; i >= 0; i--) {
          currentPosition = parseFloat(shape[i].id)
          if (shape.some(item => parseFloat(item.id) < cellCount - width && cells[parseFloat(item.id) + width].classList.contains('dead'))) {
            removeShape(currentPosition)
            makeDead(currentPosition)
          } else if (shape.every(item => parseFloat(item.id) < cellCount - width)) {
            removeShape(currentPosition)
            currentPosition += width
            addShape(currentPosition)
          } else {
            removeShape(currentPosition)
            makeDead(currentPosition)
          }
        }
        shapeNode = document.querySelectorAll(`.${shapeType}`)
        shape = Array.from(shapeNode)
      } else {
        generateShape()
      }
    }, 500)
  }


  function handleDirection(event) {
    const key = event.keyCode
    const left = 37
    const right = 39
    const down = 40
    if (key === left && shape.every(item => (parseFloat(item.id)) % width !== 0)) {
      for (let i = 0; i < shape.length; i++) {
        currentPosition = parseFloat(shape[i].id)
        removeShape(currentPosition)
        currentPosition -= 1
        addShape(currentPosition)
      }
    } else if (key === right && shape.every(item => (parseFloat(item.id)) % width !== width - 1)) {
      for (let i = shape.length - 1; i >= 0; i--) {
        currentPosition = parseFloat(shape[i].id)
        removeShape(currentPosition)
        currentPosition += 1
        addShape(currentPosition)
      }
    } else if (key === down && shape.every(item => parseFloat(item.id) < cellCount - width)) {
      for (let i = shape.length - 1; i >= 0; i--) {
        currentPosition = parseFloat(shape[i].id)
        removeShape(currentPosition)
        currentPosition += width
        addShape(currentPosition)
      }
    }
    shapeNode = document.querySelectorAll(`.${shapeType}`)
    shape = Array.from(shapeNode)
  }

 

  function removeShape(position) {
    cells[position].classList.remove(shapeType)
  }

  function addShape(postion) {
    cells[postion].classList.add(shapeType)
  }

  function makeDead(postion) {
    cells[postion].classList.add('dead')
  }



  start.addEventListener('click', generateShape)
  document.addEventListener('keydown', handleDirection)

}

window.addEventListener('DOMContentLoaded', init)