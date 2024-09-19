<template>
    <nav class="bg-white shadow-lg border-gray-200 mb-10 py-4">
      <div class="max-w-screen-xl mx-auto flex items-center justify-center px-8">
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
  
        <div class="hidden w-full md:flex items-center justify-center" id="navbar-default">
          <ul class="font-medium flex space-x-8">
            <li>
              <RouterLink to="/" class="block py-2 px-6 text-black hover:text-blue-700 transition-colors duration-300" :class="{ 'text-blue-700 font-bold': $route.path === '/' }">Accueil</RouterLink>
            </li>
            <li>
              <RouterLink to="/books" class="block py-2 px-6 text-black hover:text-blue-700 transition-colors duration-300" :class="{ 'text-blue-700 font-bold': $route.path === '/books' }">Liste de livres</RouterLink>
            </li>
            <li v-if="!userStore.user">
              <button @click="navigateTo('/register')" class="block py-2 px-6 bg-green-400 text-black hover:text-blue-700 transition-colors duration-300">S'inscrire</button>
            </li>
            <li v-if="!userStore.user">
              <button @click="navigateTo('/login')" class="block py-2 px-6 bg-blue-400 text-black hover:text-blue-700 transition-colors duration-300">Se connecter</button>
            </li>
            <li v-if="userStore.user">
              <RouterLink to="/account" class="block py-2 px-6 text-black hover:text-blue-700 transition-colors duration-300">Mon compte</RouterLink>
            </li>
            <li v-if="userStore.user">
              <button @click="logout" class="block py-2 px-6 text-black hover:text-blue-700 transition-colors duration-300">Se déconnecter</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/userStore.js.js';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const userStore = useUserStore();
  const router = useRouter();
  
  const logout = () => {
    userStore.logoutUser();
  };
  
  const navigateTo = (path) => {
    router.push(path);
  };
  </script>
  
  <style scoped>
  nav {
    background-color: white;
  }
  </style>
  