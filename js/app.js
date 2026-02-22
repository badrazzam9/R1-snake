// 🐍 Snake Game for Rabbit R1 - Classic Snake with Swipe Controls

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
let touchStartX = 0;
let touchStartY = 0;

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

// DIRECTIONAL CONTROLS - Swipe or Arrow keys for direct directions
function changeDirection(newDir) {
    if (!isPlaying) return;
    
    // Prevent reversing into self
    if (newDir.x !== -direction.x && newDir.y !== -direction.y) {
        direction = newDir;
    }
}

// Swipe detection for touchscreen
canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, false);

canvas.addEventListener('touchend', (e) => {
    if (!isPlaying) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    const minSwipe = 30;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (Math.abs(diffX) > minSwipe) {
            if (diffX > 0) {
                changeDirection({ x: 1, y: 0 }); // Right
            } else {
                changeDirection({ x: -1, y: 0 }); // Left
            }
        }
    } else {
        // Vertical swipe
        if (Math.abs(diffY) > minSwipe) {
            if (diffY > 0) {
                changeDirection({ x: 0, y: 1 }); // Down
            } else {
                changeDirection({ x: 0, y: -1 }); // Up
            }
        }
    }
}, false);

// Keyboard fallback
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') changeDirection({ x: 0, y: -1 });
    if (e.key === 'ArrowDown') changeDirection({ x: 0, y: 1 });
    if (e.key === 'ArrowLeft') changeDirection({ x: -1, y: 0 });
    if (e.key === 'ArrowRight') changeDirection({ x: 1, y: 0 });
    if (e.key === ' ' || e.key === 'Enter') {
        if (!isPlaying) startGame();
    }
});

// Rabbit R1 Scroll Wheel - Classic rotary style (optional, can coexist)
function handleScrollUp() {
    if (!isPlaying) return;
    // Rotate clockwise
    const dirs = [{x:0,y:-1}, {x:1,y:0}, {x:0,y:1}, {x:-1,y:0}];
    const current = dirs.findIndex(d => d.x === direction.x && d.y === direction.y);
    const next = dirs[(current + 1) % 4];
    direction = next;
}

function handleScrollDown() {
    if (!isPlaying) return;
    // Rotate counter-clockwise
    const dirs = [{x:0,y:-1}, {x:1,y:0}, {x:0,y:1}, {x:-1,y:0}];
    const current = dirs.findIndex(d => d.x === direction.x && d.y === direction.y);
    const next = dirs[(current + 3) % 4];
    direction = next;
}

window.addEventListener('scrollUp', handleScrollUp);
window.addEventListener('scrollDown', handleScrollDown);

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

init();
