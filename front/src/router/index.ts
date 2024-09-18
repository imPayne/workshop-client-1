import {createRouter, createWebHistory} from 'vue-router'
import Books from "../components/Books.vue";
import Home from "../components/Home.vue";


const routes = [
  { path: '/', component: Home },
  { path: '/books', component: Books },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router