<template>
  <div class="lg:w-2/5 md:w-full aspect-square mx-auto text-white relative">
    <div
      v-if="firstPlay"
      class="w-full h-full absolute bg-boundary opacity-80 flex items-center justify-center text-3xl"
    >
      <span class="lg:block hidden">Press arrow keys to start!</span>
      <img
        class="lg:hidden p-4 bg-white md:w-24 aspect-square w-16"
        src="../assets/swipe-right-icon.svg"
        alt=""
      />
    </div>
    <div
      v-if="!gameFinished"
      class="absolute -top-14 right-0 flex items-end justify-center w-max text-lg"
    >
      <span>{{ score }}</span>
      <img width="40" height="40" src="../assets/icons8-apple-64.png" alt="" />
    </div>
    <div
      :class="{ ' border-boundary grid grid-cols-7': !gameFinished }"
      class="w-full h-full gap-1 border-boundary border-4"
    >
      <div
        class="flex justify-between h-full flex-col items-center p-8 gap-2 lg:gap-5"
        v-if="gameFinished"
      >
        <div class="flex items-end justify-center w-max text-xl md:text-5xl">
          <span>{{ score }}</span>
          <img class="md:w-16 w-8" src="../assets/icons8-apple-64.png" alt="" />
        </div>
        <img class="md:w-[250px] w-32" src="../assets/pngwing.com.png" alt="" />
        <button
          @click="playAgain()"
          class="flex justify-between items-center px-3 py-1 md:px-7 md:py-2 bg-boundary md:text-2xl hover:scale-110"
        >
          <img
            width="30"
            height="30"
            src="../assets/gm_play_arrow_white_24dp.png"
            alt=""
          />
          Play
        </button>
      </div>
      <div
        v-else
        :class="{
          'bg-success': cell == 'snake',
          'bg-red-500': cell == 'apple',
        }"
        class="bg-primary text-white"
        :key="i"
        v-for="(cell, i) in board"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
let score = 0;
const cellCount = 49;
let board = ref(Array.from({ length: cellCount }, (_, index) => index));
let firstPlay = true;
let direction = "";
const cellsByEdge = Math.sqrt(cellCount);
let snakePosition = [2, 1, 0];
let appleIndex;
const gameFinished = ref(false);

onMounted(() => {
  placeSnake();
  placeApple();
  window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    switch (keyPressed) {
      case "w":
      case "ArrowUp":
        direction !== "downward" ? (direction = "upward") : undefined;
        firstPlay = false;
        break;
      case "s":
      case "ArrowDown":
        direction !== "upward" ? (direction = "downward") : undefined;
        firstPlay = false;
        break;
      case "a":
      case "ArrowLeft":
        direction !== "right" ? (direction = "left") : undefined;
        firstPlay = false;
        break;
      case "d":
      case "ArrowRight":
        direction !== "left" ? (direction = "right") : undefined;
        firstPlay = false;
        break;
    }
  });
});

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }
  firstPlay = false;
  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      direction !== "right" ? (direction = "left") : undefined;
    } else {
      /* left swipe */
      direction !== "left" ? (direction = "right") : undefined;
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
      direction !== "downward" ? (direction = "upward") : undefined;
    } else {
      /* up swipe */
      direction !== "upward" ? (direction = "downward") : undefined;
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

function playAgain() {
  clearBoard();
  appleIndex = undefined;
  score = 0;
  gameFinished.value = false;
  direction = "";
  board.value = Array.from({ length: cellCount }, (_, index) => index);
  snakePosition = [2, 1, 0];
  placeSnake();
  placeApple();
}
function clearBoard() {
  board.value.forEach((cell) => ((cell = ""), cell));
}

function placeApple() {
  let emptyCells = [];
  board.value.forEach((cell) =>
    cell !== "snake" ? emptyCells.push(cell) : undefined
  );
  appleIndex = emptyCells[Math.round(Math.random() * emptyCells.length)];
  board.value[appleIndex] = "apple";
}
function placeSnake() {
  snakePosition.forEach((index) => (board.value[index] = "snake"));
}

function checkSneakIsEating() {
  appleIndex === snakePosition[0] ? (feedSnake(), placeApple()) : "";
}
function feedSnake() {
  snakePosition.push(snakePosition[0] + handleDirection);
  score++;
}
function move() {
  if (direction !== "") {
    // for example = [2,1,0]
    let tail = snakePosition.pop();
    //[2,1]
    board.value[tail] = tail;
    snakePosition.unshift(snakePosition[0] + handleDirection());
    //[3,2,1]
    placeSnake();
    checkSneakIsEating();
    checkSnakeIsEatingTail();
    checkBoundaries();
  }
}
function handleDirection() {
  return direction === "right"
    ? 1
    : direction === "left"
    ? -1
    : direction === "upward"
    ? -cellsByEdge
    : direction === "downward"
    ? +cellsByEdge
    : 0;
}

function intervalID() {
  const gameInterval = setInterval(() => {
    handleDirection(), move();
  }, 500);
  return gameInterval;
}
console.log(intervalID());

function checkSnakeIsEatingTail() {
  snakePosition.slice(1).includes(snakePosition[0]) ? showResult() : "";
}
function showResult() {
  gameFinished.value = true;
  clearInterval(intervalID());
}
function checkBoundaries() {
  let head = snakePosition[0];
  direction === "upward" && head >= 0 - cellsByEdge && head < 0
    ? showResult()
    : direction === "downward" &&
      head < cellCount + cellsByEdge &&
      head > cellCount
    ? showResult()
    : direction === "left" && (head + 1) % cellsByEdge == 0
    ? showResult()
    : direction === "right" && head % cellsByEdge == 0
    ? showResult()
    : "";
}
</script>
