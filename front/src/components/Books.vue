<script setup>
const books = [
  { title: 'Book 1', rating: 4.9 },
  { title: 'Book 2', rating: 4.8 },
  { title: 'Book 3', rating: 4.7 },
  { title: 'Book 4', rating: 4.6 },
  { title: 'Book 5', rating: 4.5 },
  { title: 'Book 6', rating: 4.4 },
  { title: 'Book 7', rating: 4.3 },
  { title: 'Book 8', rating: 4.2 },
  { title: 'Book 9', rating: 4.1 },
  { title: 'Book 10', rating: 4.0 },
];
</script>

<template>
  <div class="max-w-4xl mx-auto mt-10 space-y-10">
    <div class="flex items-center justify-center mb-6">
      <h1 class="text-2xl font-bold">Liste des livres :</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div v-for="book in books" :key="book.title" class="flex flex-col items-center p-4 bg-gray-100 rounded-md">
        <div class="text-lg font-semibold">{{ book.title }}</div>
        <div class="text-sm text-gray-500">Note: {{ book.rating }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>