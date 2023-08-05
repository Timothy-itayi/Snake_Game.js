const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const gridSize = 20
const gridSizeX = canvas.width / gridSize
const gridSizeY = canvas.height / gridSize

// Snake data
let snake = [{ x: 10, y: 10 }]
let food = { x: 15, y: 10 }
let dx = 0 // Initial velocity (right)
let dy = 0
let changingDirection = false

// Handle keyboard input
document.addEventListener('keydown', changeDirection)

function changeDirection(event) {
  if (changingDirection) return
  changingDirection = true

  const keyPressed = event.keyCode
  const goingUp = dy === -1
  const goingDown = dy === 1
  const goingRight = dx === 1
  const goingLeft = dx === -1

  if (keyPressed === 37 && !goingRight) {
    dx = -1
    dy = 0
  }
  if (keyPressed === 38 && !goingDown) {
    dx = 0
    dy = -1
  }
  if (keyPressed === 39 && !goingLeft) {
    dx = 1
    dy = 0
  }
  if (keyPressed === 40 && !goingUp) {
    dx = 0
    dy = 1
  }
}

function showGameOverMessage(score) {
  const gameOverMessage = document.getElementById('gameOverMessage')
  gameOverMessage.textContent = `Game Over! Your score: ${score}`
  gameOverMessage.style.display = 'block'
}
let foodcount = 0

function updateFoodCounter(count) {
  const foodCountElement = document.getElementById('foodCounter')
  foodCountElement.textContent = count
}

// Main game loop
let gameLoop // Store the interval ID to control the game loop

function main() {
  if (gameOver()) {
    stopGame()
    return
  }

  gameLoop = setTimeout(function () {
    changingDirection = false
    clearCanvas()
    drawFood()
    moveSnake()
    drawSnake()
    main()
  }, 100)
}

updateFoodCounter(foodcount)

function startGame() {
  console.log('Game started!')
  main()
}

function stopGame() {
  console.log('Game stopped!')
  showGameOverMessage(snake.length - 1)
  clearTimeout(gameLoop)
}

document.getElementById('startButton').addEventListener('click', startGame)
document.getElementById('stopButton').addEventListener('click', stopGame)

function drawSnakePart(snakePart) {
  ctx.fillStyle = 'green'
  ctx.strokeStyle = 'darkgreen'
  ctx.fillRect(
    snakePart.x * gridSize,
    snakePart.y * gridSize,
    gridSize,
    gridSize
  )
  ctx.strokeRect(
    snakePart.x * gridSize,
    snakePart.y * gridSize,
    gridSize,
    gridSize
  )
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  snake.unshift(head)

  if (head.x === food.x && head.y === food.y) {
    // Snake eats the food
    generateFood()
    foodcount++
    updateFoodCounter(foodcount)
  } else {
    // Snake moves, remove the tail segment
    snake.pop()
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * gridSizeX)
  food.y = Math.floor(Math.random() * gridSizeY)
}

function drawFood() {
  ctx.fillStyle = 'red'
  ctx.strokeStyle = 'darkred'
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize)
  ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize)
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function gameOver() {
  const head = snake[0]
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      // alert('Game Over! Your score: ' + (snake.length - 1))
      return true
    }
  }

  if (head.x < 0 || head.x >= gridSizeX || head.y < 0 || head.y >= gridSizeY) {
    // alert('Game Over! Your score: ' + (snake.length - 1))
    return true
  }

  return false
}

generateFood() // Initialize food position
console.log('Snake The Game')
