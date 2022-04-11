function init() {

  const grid = document.querySelector('.grid')
  const start = document.querySelector('#start')
  const miniGrid = document.querySelector('.mini-grid')

  const width = 10
  const height = 20
  const cellCount = width * height
  const cells = []

  const miniWidth = 10
  const miniHeight = 4
  const miniCount = miniWidth * miniHeight
  const miniCells = []


  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  createGrid()

  function createMini() {
    for (let i = 0; i < miniCount; i++) {
      const cell = document.createElement('div')
      cell.id = i
      miniGrid.appendChild(cell)
      miniCells.push(cell)
    }
  }
  createMini()



  //!GAME START

  //?variables
  let currentPosition = 4
  let current
  let future
  let countTimer
  let rotateIndex = 0
  let rand = Math.floor(Math.random() * 7)
  let rowDeleted
  let rowDeletedIndex
  const nextPosition = 14
  let next

  //*shapes
  const shapeType = ['O', 'I', 'L', 'J', 'T', 'S', 'Z']

  const tetrisO = [
    [0, 1, width, width + 1]
  ]
  const tetrisI = [
    [width - 1, width, width + 1, width + 2],
    [1, 1 + width, 1 + (2 * width), 1 + (3 * width)],
    [width - 1, width, width + 1, width + 2],
    [1, 1 + width, 1 + (2 * width), 1 + (3 * width)]
  ]
  const tetrisL = [
    [1, width - 1, width, width + 1],
    [0, width, (2 * width), (2 * width) + 1],
    [- 1 + width, (2 * width) - 1, width, 1 + width],
    [0, width, (2 * width), -1]
  ]
  const tetrisJ = [
    [-1, width - 1, width, width + 1],
    [0, width, (2 * width), 1],
    [(2 * width) + 1, width - 1, width, width + 1],
    [0, width, (2 * width), (2 * width) - 1]
  ]
  const tetrisT = [
    [0, width - 1, width, width + 1],
    [0, width, (2 * width), width + 1],
    [(2 * width), width - 1, width, width + 1],
    [0, width, (2 * width), width - 1]
  ]
  const tetrisS = [
    [0, 1, width - 1, width],
    [0, width, width + 1, (2 * width) + 1],
    [0, 1, width - 1, width],
    [0, width, width + 1, (2 * width) + 1]
  ]
  const tetrisZ = [
    [0, -1, width, width + 1],
    [1, width, width + 1, (2 * width)],
    [0, -1, width, width + 1],
    [1, width, width + 1, (2 * width)]
  ]

  const tetriminos = [tetrisO, tetrisI, tetrisL, tetrisJ, tetrisT, tetrisS, tetrisZ]

  //?execute

  function removeShape(position) {
    current.forEach(item => cells[position + item].classList.remove(shapeType[rand]))
  }

  function addShape(position) {
    current.forEach(item => cells[position + item].classList.add(shapeType[rand]))
  }

  function makeDead(position) {
    current.forEach(item => cells[position + item].classList.add('dead'))
  }



  function nextShape() {

    next = tetriminos[rand][0]
    removeNext()
    rand = Math.floor(Math.random() * 7)
    next = tetriminos[rand][0]
    makeNext()


  }


  function removeNext() {
    next.forEach(item => miniCells[nextPosition + item].classList.remove(shapeType[rand]))
  }

  function makeNext() {
    next.forEach(item => miniCells[nextPosition + item].classList.add(shapeType[rand]))
  }

  function generateShape() {
    rotateIndex = 0
    currentPosition = 4
    current = tetriminos[rand][rotateIndex]
    current.forEach(item => cells[currentPosition + item].classList.add(shapeType[rand]))
    fallDown(currentPosition)
    // nextShape()
    console.log(current)
  }


  function fallDown() {
    countTimer = setInterval(() => {
      if (current.every(item => currentPosition + item < cellCount - width && !cells[currentPosition + item + width].classList.contains('dead'))) {
        console.log('clear')
        removeShape(currentPosition)
        currentPosition += width
        addShape(currentPosition)
      } else {
        removeShape(currentPosition)
        makeDead(currentPosition)
        clearInterval(countTimer)
        checkComplete()
      }
    }, 500)
  }


  function checkComplete() {
    for (let i = 0; i < cells.length; i += width) {
      const row = cells.slice(i, i + width)
      if (row.every(item => item.classList.contains('dead'))) {
        row.forEach(item => item.classList.remove('dead'))
        //increase points
        rowDeleted = true
        rowDeletedIndex = i
      } else {
        rowDeleted = false
      }
    }
    if (rowDeleted) {
      setTimeout(() => {
        while (!cells[rowDeletedIndex].classList.contains('dead')) {
          for (let i = rowDeletedIndex - 1; i > -1; i--) {
            if (cells[i].classList.contains('dead')) {
              cells[i].classList.remove('dead')
              cells[i + width].classList.add('dead')
            }
          }
        }
      }, 500)
    }
    generateShape()
  }


  function handleDirection(event) {
    const key = event.keyCode
    const left = 37
    const up = 38
    const right = 39
    const down = 40
    if (key === left && current.every(item => (currentPosition + item) % width !== 0 && !cells[currentPosition + item - 1].classList.contains('dead'))) {
      removeShape(currentPosition)
      currentPosition -= 1
      addShape(currentPosition)
    } else if (key === right && current.every(item => (currentPosition + item) % width !== 9 && !cells[currentPosition + item + 1].classList.contains('dead'))) {
      removeShape(currentPosition)
      currentPosition += 1
      addShape(currentPosition)
    } else if (key === down && current.every(item => currentPosition + item < cellCount - width && !cells[currentPosition + item + width].classList.contains('dead'))) {
      removeShape(currentPosition)
      currentPosition += width
      addShape(currentPosition)
    } else if (key === up) {
      let isRow8 = current.some(item => (currentPosition + item) >= cellCount - (2 * width))
      let isRow9 = current.some(item => (currentPosition + item) >= cellCount - width)
      let isColumn0 = current.some(item => (currentPosition + item) % width === 0)
      let isColumn1 = current.some(item => (currentPosition + item) % width === 1)
      let isColumn8 = current.some(item => (currentPosition + item) % width === 8)
      let isColumn9 = current.some(item => (currentPosition + item) % width === 9)
      rotateIndex < 3 ? future = tetriminos[rand][rotateIndex + 1] : future = tetriminos[rand][0]
      if (rand === 1) {
        if (rotateIndex % 2 === 0 && !isRow8 && !isRow9 && future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
          removeShape(currentPosition)
          rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
          current = tetriminos[rand][rotateIndex]
          addShape(currentPosition)
        } else if (rotateIndex % 2 !== 0) {
          if (isColumn0 && future.every(item => !cells[currentPosition + 2 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            currentPosition += 2
            addShape(currentPosition)
          } else if (isColumn1 && future.every(item => !cells[currentPosition + 1 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            currentPosition += 1
            addShape(currentPosition)
          } else if (isColumn9 && future.every(item => !cells[currentPosition - 2 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            currentPosition -= 2
            addShape(currentPosition)
          } else if (isColumn8 && future.every(item => !cells[currentPosition - 1 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            currentPosition -= 1
            addShape(currentPosition)
          } else {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          }
        }
      } else if (rand === 2 || rand === 3) {
        if (rotateIndex === 0) {
          if (isRow9 && future.every(item => !cells[currentPosition - width + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            currentPosition -= width
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          } else if (future.every(item => !cells[currentPosition + 1 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          }
        } else if (rotateIndex === 1) {
          if (isColumn0 && future.every(item => !cells[currentPosition + 1 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            currentPosition += 1
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          } else if (future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          }
        } else if (rotateIndex === 2 && future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
          removeShape(currentPosition)
          rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
          current = tetriminos[rand][rotateIndex]
          addShape(currentPosition)
        } else if (rotateIndex === 3) {
          if (isColumn9 && future.every(item => !cells[currentPosition - 1 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            currentPosition -= 1
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          } else if (future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          }
        }
      } else if (rand === 4) {
        if (rotateIndex === 0) {
          if (isRow9 && future.every(item => !cells[currentPosition - width + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            currentPosition -= width
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          } else if (future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          }
        } else if (rotateIndex === 1) {
          if (isColumn0 && future.every(item => !cells[currentPosition + 1 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            currentPosition += 1
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          } else if (future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          }
        } else if (rotateIndex === 2 && future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
          removeShape(currentPosition)
          rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
          current = tetriminos[rand][rotateIndex]
          addShape(currentPosition)
        } else if (rotateIndex === 3) {
          if (isColumn9 && future.every(item => !cells[currentPosition - 1 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            currentPosition -= 1
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          } else if (future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          }
        }
      } else if (rand === 5 || rand === 6) {
        if (rotateIndex % 2 === 0) {
          if (isRow9 && future.every(item => !cells[currentPosition - width + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            currentPosition -= width
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          } else if (future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          }
        } else if (rotateIndex % 2 !== 0) {
          if (isColumn0 && future.every(item => !cells[currentPosition + 1 + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            currentPosition += 1
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          } else if (future.every(item => !cells[currentPosition + item].classList.contains('dead'))) {
            removeShape(currentPosition)
            rotateIndex < 3 ? rotateIndex++ : rotateIndex = 0
            current = tetriminos[rand][rotateIndex]
            addShape(currentPosition)
          }
        }
      }
    }
  }


  start.addEventListener('click', generateShape)
  document.addEventListener('keydown', handleDirection)
  window.addEventListener('keydown', function (e) {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
      e.preventDefault()
    }
  }, false)

}

window.addEventListener('DOMContentLoaded', init)

