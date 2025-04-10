let gameSeq = [];
let userSeq = [];

let btns = ["colour1", "colour2", "colour3", "colour4"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.createElement("h3");
highScoreDisplay.innerText = `High Score: ${highScore}`;
document.querySelector(".heading").appendChild(highScoreDisplay);

function startGame() {
  if (!started) {
    console.log("Game is Start");
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = "Level 0";
    levelUp();
  }
}

document.addEventListener("keypress", startGame);
document.getElementById("start-btn").addEventListener("click", startGame);

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let ranColor = btns[randIdx];
  let randBtn = document.querySelector(`.${ranColor}`);
  gameSeq.push(ranColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
    h2.innerHTML = `Game Over! Your Score Was <b>${level}</b> <br> Press Any Key or Click Start to Restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".box");
for (let btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
