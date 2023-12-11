<template>
  <div class="mx-auto w-screen h-screen bg-black p-10 overflow-hidden">
    <h1 class="text-5xl mb-20 text-center text-success">Snake</h1>
    <snake-game></snake-game>
  </div>
</template>
<script setup>
import { defineComponent } from "vue";
import SnakeGame from "./components/SnakeGame.vue";
defineComponent(SnakeGame);
</script>
