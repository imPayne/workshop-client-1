<template>
  <div v-if="userStore.user && !userStore.user.admin" class="max-w-4xl mx-auto mt-10 space-y-10">
    <section class="my-5">
      <h2 class="text-2xl font-bold mb-4 text-center">Top 5 des livres les mieux notés :</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div v-for="book in topRatedBooks" :key="book.title" class="flex flex-col items-center p-4 bg-gray-100 rounded-md">
          <div class="max-w-32 h-auto" @click="redirectionDetail(book.id)">
            <img :src="book.coverImage" alt="da">
            <div class="text-lg font-semibold">{{ book.title }}</div>
            <div class="text-sm text-gray-500">Auteur: {{ book.author }}</div>
          </div>
        </div>
      </div>
    </section>


    <section>
      <h2 class="text-2xl font-bold mb-4 text-center">News:</h2>
      <div class="space-y-4">
        <div v-for="newsItem in localNews" :key="newsItem.idadvert" class="p-4 bg-gray-100 rounded-md">
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
        <li v-for="newsItem in localNews" :key="newsItem.idadvert" class="mb-3">
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

    <section class="mb-5">
      <h2 class="text-xl font-bold mb-3">Toutes les News</h2>
      <ul class="list-none p-0">
        <li v-for="newsItem in localNews" :key="newsItem.idadvert" class="mb-3">
          <div class="p-4 bg-gray-100 rounded-md">
            <div class="text-lg font-semibold">{{ newsItem.titre }}</div>
            <div class="text-sm text-gray-500">{{ newsItem.annonce }}</div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/userStore.js';
import { useNewsStore } from '@/stores/newsStore.js';
import router from "@/router/index.js";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const newsStore = useNewsStore();

const redirectDetail = ref(false);

function redirectionDetail(id) {
  router.push(`/books/details/${id}`);
}

const topRatedBooks = [
  { id: "nvijsUyJYR4C", title: 'Harry Potter à L\'école des Sorciers', coverImage: "http://books.google.com/books/content?id=nvijsUyJYR4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", publicationDate: "2015-12-08", publisher: "Pottermore Publishing", author: "J.K. Rowling", genre: "Fiction", summary: "Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle et une tante qui le détestent, voit son existence bouleversée. Un géant vient le chercher pour l’emmener à Poudlard, une école de sorcellerie! Voler en balai, jeter des sorts, combattre les trolls : Harry Potter se révèle un sorcier doué. Mais un mystère entoure sa naissance et l’effroyable V..., le mage dont personne n’ose prononcer le nom. Amitié, surprises, dangers, scènes comiques, Harry découvre ses pouvoirs et la vie à Poudlard. Le premier tome des aventures du jeune héros vous ensorcelle aussitôt!" },
  { id: "uRfuAAAAMAAJ",title: 'L\'étranger', coverImage: "http://books.google.com/books/content?id=uRfuAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", publicationDate: "1942-05-19", publisher: "Gallimard", author: "Albert Camus", genre: "Roman", summary: "Un jeune Algérien, Meursault, atteint d'une sorte d'inertie sans but, se retrouve mêlé aux mesquines intrigues d'un proxénète local et, de manière quelque peu inexplicable, finit par tuer un homme. Une fois qu'il est emprisonné et finalement traduit en justice, son crime, il devient évident, n'est pas tant le meurtre, sans doute défendable, qu'il a commis, mais plutôt son caractère déficient. Dans l'histoire d'un homme ordinaire qui, sans le vouloir, se laisse entraîner dans un meurtre insensé sur une plage algérienne ensoleillée, Camus explorait ce qu'il appelait « la nudité de l'homme face à l'absurde »." },
  { id: "BFZlEAAAQBAJ", title: '1984', coverImage: "http://books.google.com/books/content?id=BFZlEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", publicationDate: "1949-06-08", publisher: "Secker & Warburg", author: "George Orwell", genre: "Dystopie", summary: "Dans un futur totalitaire, Winston Smith vit sous l'œil constant du Parti et de Big Brother. Il travaille à falsifier les archives historiques, mais finit par se révolter contre l’oppression. « 1984 » explore les dangers de la surveillance, de la propagande et de la manipulation de l'histoire." },
  { id: "OYNOgPTtXF4C", title: 'Le Petit Prince', coverImage: "http://books.google.com/books/content?id=OYNOgPTtXF4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", publicationDate: "1943-04-06", publisher: "Reynal & Hitchcock", author: "Antoine de Saint-Exupéry", genre: "Conte", summary: "Un aviateur échoué dans le désert rencontre un jeune prince venu d’une autre planète. À travers son récit de voyage, le Petit Prince aborde des thèmes tels que l'amitié, l'amour et le sens de la vie, dans un style simple mais profond." },
  { id: "8tAn3HYf898C", title: 'Les Misérables', coverImage: "http://books.google.com/books/content?id=8tAn3HYf898C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", publicationDate: "1862-01-01", publisher: "A. Lacroix, Verboeckhoven & Cie", author: "Victor Hugo", genre: "Roman", summary: "Ce roman monumental suit le parcours de Jean Valjean, un ancien forçat, qui tente de racheter ses péchés dans une France en pleine transformation. Hugo y mêle des réflexions sociales et philosophiques sur la justice, la rédemption, et la lutte pour la dignité humaine." }
];

const newNews = ref({ titre: '', annonce: '' });
const localNews = ref([]); 

const fetchNews = async () => {
  await newsStore.fetchNews();
  localNews.value = [...newsStore.news]; 
};

const createNews = async () => {
  await newsStore.addNews({
    titre: newNews.value.titre,
    annonce: newNews.value.annonce,
  });
  newNews.value = { titre: '', annonce: '' };
  localNews.value = [...newsStore.news]; 
};

const deleteNews = async (idadvert) => {
  await newsStore.deleteNews(idadvert);
  localNews.value = [...newsStore.news];
};

onMounted(() => {
  fetchNews();
});

// Watcher pour synchroniser les news en cas de changement dans le store
watch(() => newsStore.news, (newNewsData) => {
  localNews.value = [...newNewsData];
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
