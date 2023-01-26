var canvas = document.getElementById("myCanvas");

var paragraph = document.getElementById("spam");

var ctx = canvas.getContext("2d");
var ballRadius = 100;
var x = canvas.width / 2;
var y = canvas.height - 160;
var dx = 2;
var dy = -2;
var paddleHeight = 120;
var paddleWidth = 150;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 8;
const brickWidth = 55;
const brickHeight = 55;
const brickPadding = 10;
const brickOffsetTop = 10;
const brickOffsetLeft = 90;

let score = 0;

function drawScore() {
  ctx.font = "16px 'Courier New'";
  ctx.fillStyle = "#FBB9A0";
  ctx.fillText("Score: " + score, 8, 280);
}

var endingImg = new Image();
endingImg.src = "deus.jpg";

var brick1 = new Image();
brick1.src = "muscle.png";

var brick2 = new Image();
brick2.src = "jung.png";

var brick3 = new Image();
brick3.src = "freud.png";

var brick4 = new Image();
brick4.src = "cat1.png";

var brick5 = new Image();
brick5.src = "birdo.png";

var brick6 = new Image();
brick6.src = "brain.png";

var brick7 = new Image();
brick7.src = "cat.png";

var bricky = [
  brick1,
  brick2,
  brick3,
  brick4,
  brick5,
  brick6,
  brick7,
  brick1,
  brick2,
  brick3,
  brick4,
  brick5,
  brick6,
  brick7,
  brick1,
];

var bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1,
    };
  }
}

function drawBlabla() {
  ctx.beginPath();
  ctx.drawImage(endingImg, x, y, canvas.width, canvas.height);
  ctx.closePath();
}

function colisionDettection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x - 50 &&
          x < b.x + brickWidth &&
          y + dy > b.y &&
          y + dy < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            canvas.style.cssText =
              "background: url('https://megafrases.com.br/wp-content/uploads/2021/01/megafrases-parabens-filho-evangelico-deus.jpg'); background-size:cover; background-repeat: repeat; background-position: center center;";
            x = -5000;
            y = -5000;
            canvas.height = 620;
            paragraph.innerHTML = "Clique aqui >>>>";
            document.getElementById("link").style.cssText =
              "color: #4168a3; text-decoration: default; cursor: pointer;  -webkit-text-stroke: 1px white; font-size: 80px;";
          }
        }
      }
    }
  }
}

var ball = new Image();
ball.src = "sprit.png";

var base = new Image();
base.src =
  "https://discord.io/content/server/944439929734312006_w036cCd0FH83.gif";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
    console.log(ae);
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
    console.log(ae);
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.drawImage(
    base,
    paddleX,
    canvas.height - (paddleHeight - 80),
    paddleWidth,
    paddleHeight
  );
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        var brickX = c * (brickPadding + brickWidth) + brickOffsetLeft;
        var brickY = r * (brickPadding + brickHeight) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        var brickIndex = r * brickRowCount + c;
        var brickImg = bricky[brickIndex];

        ctx.beginPath();

        ctx.drawImage(brickImg, brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.drawImage(ball, x, y, ballRadius, ballRadius);
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  drawBricks();
  colisionDettection();
  drawScore();

  if (x + dx > canvas.width - (ballRadius - 70) || x + dx < ballRadius - 130) {
    dx = -dx;
  }
  if (y + dy < ballRadius - 150) {
    dy = -dy;
  } else if (
    y + dy > canvas.height - (paddleHeight - 10) &&
    x > paddleX - 50 &&
    x < paddleX + (paddleWidth + 30)
  ) {
    dy = -dy;
  } else if (y + dy > canvas.height - (ballRadius - 70)) {
    document.location.reload();
    clearInterval(interval);
  }

  if (rightPressed && paddleX < canvas.width - (paddleWidth - 80)) {
    paddleX += 7;
  } else if (leftPressed && paddleX > -90) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

var interval = setInterval(draw, 15);
