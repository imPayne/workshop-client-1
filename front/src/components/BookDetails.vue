```vue
<template>
    <div class="book-details">
        <h1 class="title">{{ book.title }}</h1>
        <div class="content">
            <img :src="book.coverImage" alt="Cover Image" class="cover-image">
            <div class="details">
                <p><strong>Date de publication:</strong> {{ book.publicationDate }}</p>
                <p><strong>Auteur:</strong> {{ book.author }}</p>
                <p><strong>Editeur:</strong> {{ book.publisher }}</p>
                <p><strong>Genre:</strong> {{ book.genre }}</p>
            </div>
        </div>
        <div class="summary">
            <h2>Résumé</h2>
            <p>{{ book.summary }}</p>
        </div>
        <div class="reviews">
            <h2>Avis</h2>
            <ul>
                <li v-for="review in book.reviews" :key="review.id">
                    <p><strong>{{ review.user }}:</strong> {{ review.comment }}</p>
                </li>
            </ul>
        </div>
        <div v-if="isUserLoggedIn" class="report-issue">
            <h2>Signaler un problème</h2>
            <form @submit.prevent="submitIssue">
                <textarea v-model="issue" placeholder="Décrivez le problème"></textarea>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            book: {
                title: 'Titre du Livre',
                coverImage: 'path/to/cover/image.jpg',
                publicationDate: '2023-01-01',
                publisher: 'Nom de l\'éditeur',
                author: 'Nom de l\'auteur',
                genre: 'Genre1',
                summary: 'Ceci est un résumé du livre.',
                reviews: [
                    { id: 1, user: 'Utilisateur1', comment: 'Avis 1' },
                    { id: 2, user: 'Utilisateur2', comment: 'Avis 2' }
                ]
            },
            isUserLoggedIn: true,
            issue: ''
        };
    },
    methods: {
        // submitIssue() {
        //     console.log('Issue submitted:', this.issue);
        //     this.issue = '';
        // }
    }
};
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

.cover-image {
    max-width: 200px;
    margin-right: 20px;
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