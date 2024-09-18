<script setup lang="ts">
</script>

<template>
  <div class="flex items-center justify-center">
    <h1 class="text-2xl font-bold">Top 5 des livres les mieux notés :</h1>
  </div>
  <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
