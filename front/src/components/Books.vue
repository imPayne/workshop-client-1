<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const baseUrl = 'http://localhost:3000';

const books = ref([]);

onMounted(async () => {
   books.value = await axios.get(baseUrl+'/books/search');
   console.log(books.value);
});
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