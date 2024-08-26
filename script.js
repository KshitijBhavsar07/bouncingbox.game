const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    color: 'red',
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    isJumping: false,
};

const obstacles = [];
let gameSpeed = 5;
let score = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function handlePlayerJump() {
    if (player.isJumping) {
        player.dy += player.gravity;
        player.y += player.dy;
        if (player.y >= 300) {
            player.y = 300;
            player.dy = 0;
            player.isJumping = false;
        }
    }
}

function createObstacle() {
    const obstacle = {
        x: canvas.width,
        y: 300,
        width: 50,
        height: 50,
        color: 'green',
    };
    obstacles.push(obstacle);
}

function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= gameSpeed;
        ctx.fillStyle = obstacles[i].color;
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // Collision detection
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.height + player.y > obstacles[i].y
        ) {
            // End game
            alert('Game Over! Your score: ' + score);
            document.location.reload();
        }

        // Remove off-screen obstacles
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
            document.getElementById('score').innerText = 'Score: ' + score;
            i--;
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    handlePlayerJump();
    moveObstacles();

    requestAnimationFrame(update);
}

function startGame() {
    setInterval(createObstacle, 1500);
    update();
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !player.isJumping) {
        player.dy = player.jumpPower;
        player.isJumping = true;
    }
});

startGame();
