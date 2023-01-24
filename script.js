/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
let mousePos;
let timerValue = 1;
let gameSpeed = 2;
let time;
//game timer
function increaseTimer() {
  if (timerValue > 0) {
    setTimeout(increaseTimer, 1000);
    timerValue++;
    time = timerValue;
    document.getElementById("time").innerHTML = time;
  }
}
increaseTimer();

class Ball {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.speedX =
      Math.random() < 0.5
        ? Math.floor(Math.random() * 2) + 1
        : -(Math.floor(Math.random() * 2) + 1);
    this.speedY =
      Math.random() < 0.5
        ? Math.floor(Math.random() * 2) + 1
        : -(Math.floor(Math.random() * 2) + 1);
    this.color = "white";
    this.r = 10;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
  edges() {
    if (this.x + this.r >= canvas.width || this.x - this.r <= 0) {
      this.speedX *= -1;
    }
    if (this.y + this.r >= canvas.height || this.y - this.r <= 0) {
      this.speedY *= -1;
    }
  }
  update() {
    this.draw();
    this.edges();

    if (time > 0 && time < 10) {
      this.x += this.speedX * 2;
      this.y += this.speedY * 2;
    } else if (time >= 10 && time < 20) {
      this.x += this.speedX * 3;
      this.y += this.speedY * 3;
    } else if (time >= 20 && time < 30) {
      this.x += this.speedX * 4;
      this.y += this.speedY * 4;
    } else if (time >= 30 && time < 40) {
      this.x += this.speedX * 5;
      this.y += this.speedY * 5;
    } else if (time >= 40 && time < 50) {
      this.x += this.speedX * 6;
      this.y += this.speedY * 6;
    } else if (time >= 50 && time < 60) {
      this.x += this.speedX * 7;
      this.y += this.speedY * 7;
    } else if (time >= 60 && time < 70) {
      this.x += this.speedX * 8;
      this.y += this.speedY * 8;
    } else if (time >= 70 && time < 80) {
      this.x += this.speedX * 9;
      this.y += this.speedY * 9;
    } else {
      this.x += this.speedX * 10;
      this.y += this.speedY * 10;
    }
  }
}
console.log(Math.random() * 1 + -2);
class Paddle {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 100;
    this.speed = speed;
    this.color = "blue";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  posUpdate() {
    this.y = ball.y - this.height / 2;
  }
  playerPaddleMove() {
    this.y = mousePos - this.height / 2;
  }
  playerPaddleEdges() {
    if (this.y <= 0) {
      this.y = 0;
    }

    if (this.y >= canvas.height) {
      this.y = canvas.height - this.height;
    }
  }
}

const ball = new Ball();
const computer = new Paddle(25, canvas.height / 2, 0);
const player = new Paddle(canvas.width - 40, canvas.height / 2 - 50, 0);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.update();
  computer.draw();
  computer.posUpdate();
  player.draw();
  player.playerPaddleMove();
  player.playerPaddleEdges();

  //ball computer paddle collision
  if (
    ball.x + ball.speedX <= computer.x + computer.width &&
    ball.y + ball.speedY >= computer.y &&
    ball.y + ball.speedY <= computer.y + computer.height
  ) {
    ball.speedX *= -1;
  }

  //ball player paddle collision
  if (
    ball.x + ball.speedX >= player.x &&
    ball.y + ball.speedY >= player.y &&
    ball.y + ball.speedY <= player.y + player.height
  ) {
    ball.speedX *= -1;
  }

  requestAnimationFrame(animate);
}

document.addEventListener("pointermove", (e) => {
  e.preventDefault();
  mousePos = e.offsetY;
});
animate();
