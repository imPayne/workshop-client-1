```vue
<template>
    <div class="book-details">
        <h1 class="title text-4xl font-bold mb-10">{{ book.title }}</h1>
        <div class="content">
            <img :src="book.image" alt="Cover Image" class="w-44 h-auto mx-10">
            <div class="details">
                <p><strong>Date de publication:</strong> {{ book.publishedDate }}</p>
                <p><strong>Auteur:</strong> {{ book.authors }}</p>
                <p><strong>Editeur:</strong> {{ book.publisher }}</p>
                <p><strong>Genre:</strong> {{ book.genre }}</p>
            </div>
        </div>
        <div class="summary">
            <h2 class="text-2xl font-bold mb-10">Résumé</h2>
            <p>{{ book.summary.replace(/<\/?[^>]+(>|$)/g, "") }}</p>
        </div>
<!--        <div class="reviews">-->
<!--            <h2>Avis</h2>-->
<!--            <ul>-->
<!--                <li v-for="review in book.reviews" :key="review.id">-->
<!--                    <p><strong>{{ review.user }}:</strong> {{ review.comment }}</p>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
<!--        <div v-if="isUserLoggedIn" class="report-issue">-->
<!--            <h2>Signaler un problème</h2>-->
<!--            <form @submit.prevent="submitIssue">-->
<!--                <textarea v-model="issue" placeholder="Décrivez le problème"></textarea>-->
<!--                <button type="submit">Envoyer</button>-->
<!--            </form>-->
<!--        </div>-->
    </div>
</template>

<script setup lang="ts">

import {onMounted, PropType, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";


const route = useRoute();


const book = ref({
  title: '',
  image: '',
  publishedDate: '',
  publisher: '',
  authors: undefined,
  genre: '',
  summary: '',
})
const baseUrl = 'http://localhost:3000';

onMounted( async () => {
  const bookId = route.params.id;
  const { data } = await axios.get(baseUrl+`/books/${bookId}`);
  Object.assign(book.value, data);

  const clearGenre = [...new Set(book.value.genre)];
  book.value.genre = clearGenre.join(", ");
});

</script>

<style scoped>
.book-details {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    text-align: center;
    margin-bottom: 20px;
}

.content {
    display: flex;
}

.details {
    flex: 1;
}

.summary, .reviews, .report-issue {
    margin-top: 20px;
}

textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}

.new-section {
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>