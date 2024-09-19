<template>
  <div v-if="!userStore.user" class="max-w-4xl mx-auto mt-10 space-y-10">
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
    </section>

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
        <div v-for="newsItem in newsStore.news" :key="newsItem.idadvert" class="p-4 bg-gray-100 rounded-md">
          <div class="text-lg font-semibold">{{ newsItem.titre }}</div>
          <div class="text-sm text-gray-500">{{ newsItem.annonce }}</div>
        </div>
      </div>
    </section>
  </div>

  <div v-if="userStore.user && userStore.user.admin" class="max-w-4xl mx-auto mt-10 space-y-10">
    <section class="mb-5">
      <h2 class="text-xl font-bold mb-3">Créer News</h2>
      <form @submit.prevent="createNews" class="flex flex-col">
        <input v-model="newNews.titre" class="mb-3 p-2 border border-gray-300 rounded" placeholder="Title" />
        <textarea v-model="newNews.annonce" class="mb-3 p-2 border border-gray-300 rounded" placeholder="Content"></textarea>
        <button class="p-2 bg-blue-500 text-white rounded hover:bg-blue-700" type="submit">Create</button>
      </form>
    </section>
    <section class="mb-5">
      <h2 class="text-xl font-bold mb-3">Supprimer News</h2>
      <ul class="list-none p-0">
        <li v-for="newsItem in newsStore.news" :key="newsItem.idadvert" class="mb-3">
          <div class="flex justify-between items-center p-4 bg-gray-100 rounded-md">
            <div>
              <div class="text-lg font-semibold">{{ newsItem.titre }}</div>
              <div class="text-sm text-gray-500">{{ newsItem.annonce }}</div>
            </div>
            <button @click="deleteNews(newsItem.idadvert)" class="p-2 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
          </div>
        </li>
      </ul>
    </section>
    <!-- <section class="mb-5">
      <h2 class="text-xl font-bold mb-3">Modifier News</h2>
      <ul class="list-none p-0">
        <li v-for="newsItem in newsStore.news" :key="newsItem.idadvert" class="mb-3">
          <div class="flex flex-col p-4 bg-gray-100 rounded-md">
            <input v-model="newsItem.titre" class="mb-3 p-2 border border-gray-300 rounded" />
            <textarea v-model="newsItem.annonce" class="mb-3 p-2 border border-gray-300 rounded"></textarea>
            <button @click="updateNews(newsItem)" class="p-2 bg-green-500 text-white rounded hover:bg-green-700">Save</button>
          </div>
        </li>
      </ul>
    </section> -->
    <section class="mb-5">
      <h2 class="text-xl font-bold mb-3">Toutes les News</h2>
      <ul class="list-none p-0">
        <li v-for="newsItem in newsStore.news" :key="newsItem.idadvert" class="mb-3">
          <div class="p-4 bg-gray-100 rounded-md">
            <div class="text-lg font-semibold">{{ newsItem.titre }}</div>
            <div class="text-sm text-gray-500">{{ newsItem.idadvert }}</div>
            <div class="text-sm text-gray-500">{{ newsItem.annonce }}</div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore.js';
import { useNewsStore } from '@/stores/newsStore.js';

const userStore = useUserStore();
const newsStore = useNewsStore();

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

const newNews = ref({ titre: '', annonce: '' });

const fetchNews = async () => {
  await newsStore.fetchNews();
  console.log(newsStore.news); // Vérifie les données ici

};

const createNews = async () => {
  await newsStore.addNews({
    titre: newNews.value.titre,
    annonce: newNews.value.annonce,
  });
  newNews.value = { titre: '', annonce: '' };
};

const deleteNews = async (idadvert) => {
  await newsStore.deleteNews(idadvert);
};

onMounted(() => {
  fetchNews();
});
</script>

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
