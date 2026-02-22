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
let direction = { x: 1, y: 0 };
let food = { x: 10, y: 10 };
let score = 0;
let gameLoop = null;
let isPlaying = false;
let gameSpeed = 150;

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

function changeDirection(newDir) {
    if (!isPlaying) return;
    if (newDir.x !== -direction.x && newDir.y !== -direction.y) {
        direction = newDir;
    }
}

// TOUCH/SWIPE CONTROLS - Added to the entire document for better detection
let touchStartX = 0;
let touchStartY = 0;
const MIN_SWIPE = 30;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, {passive: false});

document.addEventListener('touchend', function(e) {
    if (!isPlaying) return;
    
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    if (Math.abs(diffX) < MIN_SWIPE && Math.abs(diffY) < MIN_SWIPE) {
        return; // Too small to be a swipe
    }
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal
        if (diffX > 0) {
            changeDirection({ x: 1, y: 0 }); // Right
        } else {
            changeDirection({ x: -1, y: 0 }); // Left
        }
    } else {
        // Vertical
        if (diffY > 0) {
            changeDirection({ x: 0, y: 1 }); // Down
        } else {
            changeDirection({ x: 0, y: -1 }); // Up
        }
    }
}, {passive: false});

// Prevent scrolling on touch
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, {passive: false});

// Keyboard fallback
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') changeDirection({ x: 0, y: -1 });
    if (e.key === 'ArrowDown') changeDirection({ x: 0, y: 1 });
    if (e.key === 'ArrowLeft') changeDirection({ x: -1, y: 0 });
    if (e.key === 'ArrowRight') changeDirection({ x: 1, y: 0 });
    if (e.key === ' ' || e.key === 'Enter') {
        if (!isPlaying) startGame();
    }
});

// Rabbit R1 Scroll Wheel (optional)
function handleScrollUp() {
    if (!isPlaying) return;
    const dirs = [{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}];
    const current = dirs.findIndex(d => d.x === direction.x && d.y === direction.y);
    direction = dirs[(current + 1) % 4];
}

function handleScrollDown() {
    if (!isPlaying) return;
    const dirs = [{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}];
    const current = dirs.findIndex(d => d.x === direction.x && d.y === direction.y);
    direction = dirs[(current + 3) % 4];
}

window.addEventListener('scrollUp', handleScrollUp);
window.addEventListener('scrollDown', handleScrollDown);

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

init();
