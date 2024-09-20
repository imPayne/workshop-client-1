// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue'; 
import Account from '@/components/Account.vue'; 
import Books from '@/components/Books.vue';
import BookDetails from '@/components/BookDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/books', component: Books },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/account', component: Account },
  { path: '/books/details/:id', component: BookDetails }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
