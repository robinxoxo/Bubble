//! Varibles
let container = document.querySelector("#pbtm");
let computedStyles = getComputedStyle(container);

let paddingY =
  parseFloat(computedStyles.paddingTop) +
  parseFloat(computedStyles.paddingBottom);
let paddingX =
  parseFloat(computedStyles.paddingLeft) +
  parseFloat(computedStyles.paddingRight);

let numCols = Math.floor((container.clientWidth - paddingX) / 70);
let numRows = Math.floor((container.clientHeight - paddingY) / 70);

let numBubbles = numCols * numRows;

let timer1 = 61;
var hitnum = 0;

// -----------------------------------------------//
//! Bubble

let bubbleNumbers = [];
for (let i = 0; i < numBubbles; i++) {
  bubbleNumbers.push(i);
}
bubbleNumbers.push(hitnum); // Include the hitnum

// Shuffle the bubble numbers array
for (let i = bubbleNumbers.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [bubbleNumbers[i], bubbleNumbers[j]] = [bubbleNumbers[j], bubbleNumbers[i]];
}

function generateBubbles() {
  numCols = Math.floor((container.clientWidth - paddingX) / 70);
  numRows = Math.floor((container.clientHeight - paddingY) / 70);

  let bubbleHTML = "";
  for (let i = 0; i < numBubbles; i++) {
    let bubbleValue = bubbleNumbers[i];
    let displayedValue = bubbleValue === hitnum ? numBubbles : bubbleValue;
    bubbleHTML += `<div class="bubble">${displayedValue}</div>`;
  }

  container.innerHTML = bubbleHTML;
}

// Generate bubbles initially
generateBubbles();

// Regenerate bubbles when the window is resized
window.addEventListener("resize", generateBubbles);

////------------------------------------------------------------
//! display game & score

function displayGameOver() {
  document.querySelector("#pbtm").innerHTML = `
<h1 class="dark">Game Over</h1>
<p class="ark"> Your score is ${score}</p>
`;
playGameOverSound();
}

////------------------------------------------------------------
//! timer

function runTimer() {
  let timer2 = setInterval(function () {
    if (timer1 > 0) {
      timer1--;
      document.querySelector("#timervalue").textContent = timer1;
    } else {
      clearInterval(timer2);
      displayGameOver();
    }
  }, 1000);
}
runTimer();

////------------------------------------------------------------
//! hit
function getNewHit() {
  hitnum = Math.floor(Math.random() * numBubbles);
  document.querySelector("#hitvalue").textContent = hitnum;
}
getNewHit();

////------------------------------------------------------------
//! score
let score = 0;
function increaseScore() {
  score += 10;
  document.querySelector("#scorevalue").textContent = score;
}

////------------------------------------------------------------
//! bubble sound
function playBubbleSound() {
  var bubbleSound = document.getElementById("bubbleSound");
  bubbleSound.play();
}
////------------------------------------------------------------

document.querySelector("#pbtm").addEventListener("click", function (details) {
  var clickNum = Number(details.target.textContent);
  if (clickNum === hitnum) {
    increaseScore();
    generateBubbles();
    getNewHit();
    playBubbleSound(); // Play the sound
  }
});

////------------------------------------------------------------
//! gameover sound
function playGameOverSound() {
  var gameOverSound = document.getElementById("gameOverSound");
  gameOverSound.play();
}


