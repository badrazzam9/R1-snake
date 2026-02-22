// 🐍 Snake Game for Rabbit R1 - ROTARY CONTROLS

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreEl = document.getElementById('score');
const gameOverEl = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');

const GRID_SIZE = 10;
const TILE_COUNT = 20;

let snake = [];
let direction = { x: 1, y: 0 }; // Current direction
let food = { x: 10, y: 10 };
let score = 0;
let gameLoop = null;
let isPlaying = false;
let gameSpeed = 150;

// Direction states: 0=UP, 1=RIGHT, 2=DOWN, 3=LEFT
// Current direction index based on: x,y
const DIR_MAP = {
    '0,-1': 0,  // UP
    '1,0': 1,   // RIGHT
    '0,1': 2,   // DOWN
    '-1,0': 3   // LEFT
};

const DIR_FROM_INDEX = [
    { x: 0, y: -1 }, // 0 = UP
    { x: 1, y: 0 },  // 1 = RIGHT
    { x: 0, y: 1 },  // 2 = DOWN
    { x: -1, y: 0 }  // 3 = LEFT
];

function getCurrentDirIndex() {
    const key = `${direction.x},${direction.y}`;
    return DIR_MAP[key] !== undefined ? DIR_MAP[key] : 1;
}

function cycleDirection(scrollUp) {
    const current = getCurrentDirIndex();
    let newIndex;
    
    if (scrollUp) {
        // Clockwise: UP(0) → RIGHT(1) → DOWN(2) → LEFT(3) → UP(0)
        newIndex = (current + 1) % 4;
    } else {
        // Counter-clockwise: UP(0) → LEFT(3) → DOWN(2) → RIGHT(1) → UP(0)
        newIndex = (current + 3) % 4;
    }
    
    direction = { ...DIR_FROM_INDEX[newIndex] };
}

function init() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    score = 0;
    gameSpeed = 150;
    placeFood();
    draw();
    scoreEl.textContent = `Score: ${score}`;
    gameOverEl.classList.add('hidden');
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT)
    };
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            placeFood();
            break;
        }
    }
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        const isHead = i === 0;
        ctx.fillStyle = isHead ? '#00ff00' : '#00aa00';
        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );
    }
    
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
        food.x * GRID_SIZE + 1,
        food.y * GRID_SIZE + 1,
        GRID_SIZE - 2,
        GRID_SIZE - 2
    );
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }
    
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = `Score: ${score}`;
        placeFood();
        if (score % 50 === 0 && gameSpeed > 50) {
            gameSpeed -= 10;
        }
    } else {
        snake.pop();
    }
    
    draw();
}

function gameOver() {
    isPlaying = false;
    clearInterval(gameLoop);
    gameLoop = null;
    finalScoreEl.textContent = score;
    gameOverEl.classList.remove('hidden');
}

function startGame() {
    if (isPlaying) return;
    init();
    isPlaying = true;
    startBtn.classList.add('hidden');
    gameLoop = setInterval(update, gameSpeed);
}

// Scroll wheel - ROTARY control!
function handleScrollUp() {
    if (!isPlaying) return;
    cycleDirection(true); // Clockwise
}

function handleScrollDown() {
    if (!isPlaying) return;
    cycleDirection(false); // Counter-clockwise
}

// Register R1 scroll events
if (typeof window !== 'undefined') {
    window.addEventListener('scrollUp', handleScrollUp);
    window.addEventListener('scrollDown', handleScrollDown);
    
    // Keyboard fallback
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') handleScrollUp();
        if (e.key === 'ArrowDown') handleScrollDown();
        if (e.key === ' ' || e.key === 'Enter') {
            if (!isPlaying) startGame();
        }
    });
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

init();
