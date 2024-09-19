<script setup>
const topRatedBooks = [
  { title: 'Book 1', rating: 4.9 },
  { title: 'Book 2', rating: 4.8 },
  { title: 'Book 3', rating: 4.7 },
  { title: 'Book 4', rating: 4.6 },
  { title: 'Book 5', rating: 4.5 },
];

const latestBooks = [
  { title: 'New Book 1', releaseDate: '2023-10-01' },
  { title: 'New Book 2', releaseDate: '2023-09-25' },
  { title: 'New Book 3', releaseDate: '2023-09-20' },
  { title: 'New Book 4', releaseDate: '2023-09-15' },
  { title: 'New Book 5', releaseDate: '2023-09-10' },
];

const genreBooks = [
  { title: 'Action Book 1', genre: 'Action' },
  { title: 'Action Book 2', genre: 'Action' },
  { title: 'Action Book 3', genre: 'Action' },
  { title: 'Action Book 4', genre: 'Action' },
  { title: 'Action Book 5', genre: 'Action' },
];

const news = [
  { title: 'News 1', content: 'Content of news 1' },
  { title: 'News 2', content: 'Content of news 2' },
  { title: 'News 3', content: 'Content of news 3' },
  { title: 'News 4', content: 'Content of news 4' },
  { title: 'News 5', content: 'Content of news 5' },
];
</script>

<template>
  <div class="max-w-4xl mx-auto mt-10 space-y-10">
    <section class="my-5">
      <h2 class="text-2xl font-bold mb-4 text-center">Top 5 des livres les mieux notés :</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div v-for="book in topRatedBooks" :key="book.title" class="flex flex-col items-center p-4 bg-gray-100 rounded-md">
          <div class="text-lg font-semibold">{{ book.title }}</div>
          <div class="text-sm text-gray-500">Note: {{ book.rating }}</div>
        </div>
      </div>
    </section>

    <section class="my-5">
      <h2 class="text-2xl font-bold mb-4 text-center">Top 5 des livres dernièrement parus :</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div v-for="book in latestBooks" :key="book.title" class="flex flex-col items-center p-4 bg-gray-100 rounded-md">
          <div class="text-lg font-semibold">{{ book.title }}</div>
          <div class="text-sm text-gray-500">Date de sortie: {{ book.releaseDate }}</div>
        </div>
      </div>
    </section class="my-5">

    <section class="my-5">
      <h2 class="text-2xl font-bold mb-4 text-center">Top 5 des livres pour le genre Action :</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div v-for="book in genreBooks" :key="book.title" class="flex flex-col items-center p-4 bg-gray-100 rounded-md">
          <div class="text-lg font-semibold">{{ book.title }}</div>
          <div class="text-sm text-gray-500">Genre: {{ book.genre }}</div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4 text-center">News créées par l'admin :</h2>
      <div class="space-y-4">
        <div v-for="newsItem in news" :key="newsItem.title" class="p-4 bg-gray-100 rounded-md">
          <div class="text-lg font-semibold">{{ newsItem.title }}</div>
          <div class="text-sm text-gray-500">{{ newsItem.content }}</div>
        </div>
      </div>
    </section>
  </div>
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