function init() {

  //elements
  const grid = document.querySelector('.grid')
  const start = document.querySelector('#start')

  //grid creation
  const width = 10
  const height = 10
  const cellCount = width * height
  const cells = []

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      cell.id = i
      grid.appendChild(cell)
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
  let rotateIndex = 0


  //rotation arrays
  const zRotate1 = [-width + 2, 1, -width, -1]
  const zRotate2 = [width * 2, -1, -1, 0]
  const sRotate1 = [-width, -1, 2 - width, 1]
  const sRotate2 = [(2 * width) - 1, +width, -1, -width]

  //?execute
  //shape generation
  function generateShape() {
    clearInterval(countTimer)
    rotateIndex = 0
    const rand = 6//Math.floor(Math.random() * 7)
    if (rand === 0) {
      cells[4].classList.add('o')
      cells[4 + 1].classList.add('o')
      cells[4 + width].classList.add('o')
      cells[4 + width + 1].classList.add('o')
      shapeType = 'o'
    } else if (rand === 1) {
      cells[4].classList.add('i')
      cells[4 + width].classList.add('i')
      cells[4 + (2 * width)].classList.add('i')
      cells[4 + (3 * width)].classList.add('i')
      shapeType = 'i'
    } else if (rand === 2) {
      cells[4].classList.add('l')
      cells[4 + width].classList.add('l')
      cells[4 + width - 1].classList.add('l')
      cells[4 + width - 2].classList.add('l')
      shapeType = 'l'
    } else if (rand === 3) {
      cells[4].classList.add('j')
      cells[4 + width].classList.add('j')
      cells[4 + width + 1].classList.add('j')
      cells[4 + width + 2].classList.add('j')
      shapeType = 'j'
    } else if (rand === 4) {
      cells[4].classList.add('t')
      cells[4 + width].classList.add('t')
      cells[4 + width - 1].classList.add('t')
      cells[4 + width + 1].classList.add('t')
      shapeType = 't'
    } else if (rand === 5) {
      cells[4].classList.add('s')
      cells[4 + 1].classList.add('s')
      cells[4 + width].classList.add('s')
      cells[4 + width - 1].classList.add('s')
      shapeType = 's'
    } else if (rand === 6) {
      cells[4].classList.add('z')
      cells[4 - 1].classList.add('z')
      cells[4 + width].classList.add('z')
      cells[4 + width + 1].classList.add('z')
      shapeType = 'z'
    }
    makeShapeArr()
    fallDown()
  }

  //fallDown
  // function fallDown() {
  //   countTimer = setInterval(() => {
  //     if (shape.length) {
  //       for (let i = shape.length - 1; i >= 0; i--) {
  //         currentPosition = parseFloat(shape[i].id)
  //         if (shape.some(item => parseFloat(item.id) < cellCount - width && cells[parseFloat(item.id) + width].classList.contains('dead'))) {
  //           removeShape(currentPosition)
  //           makeDead(currentPosition)
  //         } else if (shape.every(item => parseFloat(item.id) < cellCount - width)) {
  //           removeShape(currentPosition)
  //           currentPosition += width
  //           addShape(currentPosition)
  //         } else {
  //           removeShape(currentPosition)
  //           makeDead(currentPosition)
  //         }
  //       }
  //       makeShapeArr()
  //     } else {
  //       generateShape()
  //     }
  //   }, 1000)
  // }




  function handleDirection(event) {
    const key = event.keyCode
    const left = 37
    const up = 38
    const right = 39
    const down = 40
    if (key === left && shape.every(item => (parseFloat(item.id)) % width !== 0 && !cells[parseFloat(item.id) - 1].classList.contains('dead'))) {
      for (let i = 0; i < shape.length; i++) {
        currentPosition = parseFloat(shape[i].id)
        removeShape(currentPosition)
        currentPosition -= 1
        addShape(currentPosition)
      }
    } else if (key === right && shape.every(item => (parseFloat(item.id)) % width !== width - 1 && !cells[parseFloat(item.id) + 1].classList.contains('dead'))) {
      for (let i = shape.length - 1; i >= 0; i--) {
        currentPosition = parseFloat(shape[i].id)
        removeShape(currentPosition)
        currentPosition += 1
        addShape(currentPosition)
      }
    } else if (key === down && shape.every(item => parseFloat(item.id) < cellCount - width && !cells[parseFloat(item.id) + width].classList.contains('dead'))) {
      for (let i = shape.length - 1; i >= 0; i--) {
        currentPosition = parseFloat(shape[i].id)
        removeShape(currentPosition)
        currentPosition += width
        addShape(currentPosition)
      }
    } else if (key === up) {
      if (shapeType === 'z') {
        if (rotateIndex % 2 === 0 && (!cells[parseFloat(shape[1].id) + 1].classList.contains('dead') && !cells[parseFloat(shape[3].id) - (2 * width)].classList.contains('dead'))) {
          for (let i = 0; i < shape.length; i++) {
            currentPosition = parseFloat(shape[i].id)
            removeShape(currentPosition)
            currentPosition += zRotate1[i]
            addShape(currentPosition)
          } rotateIndex < 3 ? rotateIndex += 1 : rotateIndex = 0
        } else if (rotateIndex % 2 !== 0 && (!cells[parseFloat(shape[3].id) + 1].classList.contains('dead') && !cells[parseFloat(shape[2].id) - 1].classList.contains('dead'))) {
          if (shape.some(item => (parseFloat(item.id)) % width === 0) && (!cells[parseFloat(shape[3].id) + 1].classList.contains('dead') && !cells[parseFloat(shape[3].id) + 2].classList.contains('dead'))) {
            for (let i = 0; i < shape.length; i++) {
              currentPosition = parseFloat(shape[i].id)
              removeShape(currentPosition)
              currentPosition += zRotate2[i] + 1
              addShape(currentPosition)
            } rotateIndex < 3 ? rotateIndex += 1 : rotateIndex = 0
          } else if (shape.every(item => (parseFloat(item.id)) % width !== 0)) {
            for (let i = 0; i < shape.length; i++) {
              currentPosition = parseFloat(shape[i].id)
              removeShape(currentPosition)
              currentPosition += zRotate2[i]
              addShape(currentPosition)
            } rotateIndex < 3 ? rotateIndex += 1 : rotateIndex = 0
          }
        }
      }
      if (shapeType === 's') {
        if (rotateIndex % 2 === 0 && (!cells[parseFloat(shape[0].id) - width].classList.contains('dead') && !cells[parseFloat(shape[3].id) + 1].classList.contains('dead'))) {
          for (let i = 0; i < shape.length; i++) {
            currentPosition = parseFloat(shape[i].id)
            removeShape(currentPosition)
            currentPosition += sRotate1[i]
            addShape(currentPosition)
          } rotateIndex < 3 ? rotateIndex += 1 : rotateIndex = 0
        } else if (rotateIndex % 2 !== 0 && (!cells[parseFloat(shape[3].id) - 1].classList.contains('dead') && !cells[parseFloat(shape[3].id) - 2].classList.contains('dead'))) {
          if (shape.some(item => (parseFloat(item.id)) % width === 0) && (!cells[parseFloat(shape[1].id) + width].classList.contains('dead') && !cells[parseFloat(shape[2].id) + 1].classList.contains('dead'))) {
            for (let i = 0; i < shape.length; i++) {
              currentPosition = parseFloat(shape[shape.length - i - 1].id)
              removeShape(currentPosition)
              currentPosition += sRotate2[shape.length - i - 1] + 1
              addShape(currentPosition)
            } rotateIndex < 3 ? rotateIndex += 1 : rotateIndex = 0
          } else if (shape.every(item => (parseFloat(item.id)) % width !== 0)) {
            for (let i = 0; i < shape.length; i++) {
              currentPosition = parseFloat(shape[i].id)
              removeShape(currentPosition)
              currentPosition += sRotate2[i]
              addShape(currentPosition)
            } rotateIndex < 3 ? rotateIndex += 1 : rotateIndex = 0
          }
        }
      }
    }
    makeShapeArr()
  }

  cells[25].classList.add('dead')

  function removeShape(position) {
    cells[position].classList.remove(shapeType)
  }

  function addShape(postion) {
    cells[postion].classList.add(shapeType)
  }

  function makeDead(postion) {
    cells[postion].classList.add('dead')
  }

  function makeShapeArr() {
    shapeNode = document.querySelectorAll(`.${shapeType}`)
    shape = Array.from(shapeNode)
  }



  start.addEventListener('click', generateShape)
  document.addEventListener('keydown', handleDirection)

}

window.addEventListener('DOMContentLoaded', init)