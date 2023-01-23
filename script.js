/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
let mousePos;

class Ball {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.speedX = 4;
    this.speedY = 4
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
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

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
    this.y = mousePos;
  }
  playerPaddleEdges() {
    if (this.y <= 0) {
      this.y = 0;
    }

    if (this.y >= canvas.height) {
      this.y = canvas.height- this.height;
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
     ball.speedY *= -1;
   }

  //ball player paddle collision

  if(ball.x + ball.speedX >= player.x && ball.y + ball.speedY >= player.y && ball.y + ball.speedY <= player.y + player.height ){
    ball.speedX *= -1
    ball.speedY *= -1
  
  }

  requestAnimationFrame(animate);
}

document.addEventListener("pointermove", (e) => {
  mousePos = e.offsetY;
  console.log(e.y);
});
animate();
