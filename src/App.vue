<template>
  <div class="mx-auto w-screen h-screen bg-black p-10">
    <h1 class="text-5xl mb-20 text-center text-success">Snake</h1>
    <game-vue></game-vue>
  </div>
</template>
<script setup>
import { defineComponent } from "vue";
import gameVue from "./components/gameVue.vue";
defineComponent(gameVue);
</script>
