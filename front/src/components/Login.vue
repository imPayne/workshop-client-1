<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
    <form @submit.prevent="login" class="space-y-4">
      <input v-model="mail" type="text" placeholder="Mail" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model="password" type="password" placeholder="Password" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore.js';

const mail = ref('');
const password = ref('');

const userStore = useUserStore();

const login = async () => {
  await userStore.loginUser({ mail: mail.value, password: password.value });
};
</script>
  