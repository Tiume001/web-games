const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE_LENGTH = 5;
let SPEED = 170; // Milliseconds per frame

let canvas;
let ctx;
let snake;
let food;
let direction;
let gameInterval;

// Setup canvas and initialize game
function setup() {
    canvas = document.createElement("canvas");
    canvas.width = COLS * CELL_SIZE;
    canvas.height = ROWS * CELL_SIZE;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    snake = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];
    for (let i = 1; i < INITIAL_SNAKE_LENGTH; i++) {
        snake.push({ x: snake[0].x - i, y: snake[0].y });
    }

    placeFood();

    direction = { x: 1, y: 0 }; // Initial direction: right

    document.addEventListener("keydown", changeDirection);

    gameInterval = setInterval(gameLoop, SPEED);
}

// Main game loop
function gameLoop() {
    update();
    draw();
}

// Update game state
function update() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for collision with walls or itself
    if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS || isSnakeAt(newHead)) {
        clearInterval(gameInterval);
        alert("Game over!");
        return;
    }

    // Check for food
    if (newHead.x === food.x && newHead.y === food.y) {
        snake.unshift(newHead);
        placeFood();
    } else {
        snake.unshift(newHead);
        snake.pop();
    }
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    //TODO with images/wall.png

    // Draw snake
    snake.forEach(segment => {
        const snakeImg = new Image();
        snakeImg.src = 'imgs/snake.png'; // Immagine del corpo del serpente
        ctx.drawImage(snakeImg, segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    // Draw food
    const foodImg = new Image();
    foodImg.src = 'imgs/apple.png'; // Immagine della mela
    ctx.drawImage(foodImg, food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// Generate random food position
function placeFood() {
    food = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS)
    };

    // Ensure food doesn't spawn on the snake
    while (isSnakeAt(food)) {
        food = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS)
        };
    }
}

// Change snake direction
function changeDirection(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y !== 1) {
                direction = { x: 0, y: -1 };
            }
            break;
        case "ArrowDown":
            if (direction.y !== -1) {
                direction = { x: 0, y: 1 };
            }
            break;
        case "ArrowLeft":
            if (direction.x !== 1) {
                direction = { x: -1, y: 0 };
            }
            break;
        case "ArrowRight":
            if (direction.x !== -1) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
}

// Check if a position is occupied by the snake
function isSnakeAt(position) {
    return snake.some(segment => segment.x === position.x && segment.y === position.y);
}

const startMenuHTML = `
    <div id="startMenu">
        <h1>Snake Game</h1>
        <label for="speedInput">Select speed:</label>
        <select id="speedInput">
            <option value="100">Fast</option>
            <option value="200">Medium</option>
            <option value="300">Slow</option>
        </select>
        <button onclick="startGame()">Start</button>
    </div>
`;

const canvasHTML = `<canvas id="gameCanvas" style="display: none;"></canvas>`;

document.body.innerHTML = startMenuHTML + canvasHTML;

function startGame() {
    const speedInput = document.getElementById("speedInput");
    SPEED = parseInt(speedInput.value);
    setup();
}
