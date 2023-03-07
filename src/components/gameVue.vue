<template>
  <div class="w-1/3 aspect-square mx-auto text-success">
    <div class="grid grid-cols-5 w-full h-full gap-1">
      <div
        :class="{ 'bg-success': cell == true }"
        class="bg-primary text-white"
        :key="i"
        v-for="(cell, i) in board"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const cellCount = 25;
const board = ref(new Array(cellCount));
const snakeLength = 2;
let direction = "";
const cellsByEdge = Math.sqrt(cellCount);
let index = cellsByEdge * 2 + 2;

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    switch (keyPressed) {
      case "w":
        direction = "upward";
        break;
      case "s":
        direction = "downward";
        break;
      case "a":
        direction = "left";
        break;
      case "d":
        direction = "right";
        break;
    }
  });
});
function resetTheBoard() {
  board.value.forEach((cell, i) => (board.value[i] = undefined));
}
function placeSnake() {
  //   board.value[handleMovement().oldIndex] = true;
  //   board.value[handleMovement().currentIndex] = true;
  for (let i = 0; i < snakeLength; i++) {
    board.value[index + i] = true;
  }
}
function handleMovement() {
  return direction === "right"
    ? { index: index++ }
    : direction === "left"
    ? index--
    : direction === "upward"
    ? { index: (index -= cellsByEdge) }
    : direction === "downward"
    ? (index += cellsByEdge)
    : { oldIndex: index - 1, currentIndex: index };
}
setInterval(() => {
  index + 1 < cellCount && index >= 0
    ? (resetTheBoard(), handleMovement(), placeSnake())
    : undefined;
}, 300);
</script>
