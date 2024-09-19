<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Mon Compte</h1>
      <div v-if="userStore.user" class="space-y-4">
        <div class="bg-gray-100 p-4 rounded-lg">
          <h2 class="text-xl font-semibold">Informations personnelles</h2>
          <p><strong>Pseudo :</strong> {{ userStore.user.pseudo }}</p>
          <p><strong>Nom :</strong> {{ userStore.user.name }}</p>
          <p><strong>Prénom :</strong> {{ userStore.user.firstname }}</p>
          <p><strong>Email :</strong> {{ userStore.user.mail || 'Non fourni' }}</p>
          <p><strong>Genre :</strong> {{ userStore.user.gender ? 'Femme' : 'Homme' }}</p>
          <p><strong>Âge :</strong> {{ userStore.user.age }}</p>
          <p><strong>Bio :</strong> {{ userStore.user.bio || 'Non renseignée' }}</p>
        </div>
        <button @click="logout" class="bg-red-500 text-white py-2 px-4 rounded">Se déconnecter</button>
      </div>
      <div v-else>
        <p>Vous devez être connecté pour voir cette page.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/userStore.js.js';
  import {watch} from "vue";
  import {useRouter} from "vue-router";
  
  const userStore = useUserStore();

  const router = useRouter();

  const logout = () => {
    userStore.logoutUser();
  };

  watch(() => userStore.user, () => {
    console.log(userStore.user);
    if (!userStore.user) {
      router.push('/');
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  