<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center mb-6">S'inscrire</h1>
    <form @submit.prevent="register" class="space-y-4">
      <input v-model="pseudo" type="text" placeholder="Pseudo" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model="password" type="password" placeholder="Mot de passe" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model="name" type="text" placeholder="Nom" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model="firstname" type="text" placeholder="Prénom" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model="mail" type="email" placeholder="Email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <select v-model="gender" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="0">Homme</option>
        <option value="1">Femme</option>
      </select>
      <input v-model="age" type="number" placeholder="Âge" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">S'inscrire</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore.js';
import { useRouter } from 'vue-router';

const pseudo = ref('');
const password = ref('');
const name = ref('');
const firstname = ref('');
const mail = ref('');
const gender = ref('false');
const age = ref('');

const userStore = useUserStore();
const router = useRouter();

const register = async () => {
  try {
    await userStore.registerUser({
      pseudo: pseudo.value,
      password: password.value,
      name: name.value,
      firstname: firstname.value,
      mail: mail.value,
      gender: gender.value === 'true',
      age: parseInt(age.value, 10),
      tags: "Drama",
      admin: false
    });
    await router.push('/');
  } catch (error) {
    console.error('Error during registration:', error);
  }
};
</script>
