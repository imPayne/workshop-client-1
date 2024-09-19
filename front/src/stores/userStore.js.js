import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { decodeToken } from '../utils/decodeToken'; 

const baseUrl = "http://localhost:3000";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async registerUser(userDetails) {
      try {
        const response = await axios.post(baseUrl+'/users/register', userDetails);
        this.user = response.data;
        const router = useRouter();
        router.push('/');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
    async loginUser(credentials) {
      try {
        const response = await axios.post(baseUrl+'/users/login', credentials);
        this.token = response.data.token;
        this.user = decodeToken(this.token);
        const router = useRouter();
        router.push('/');
      } catch (error) {
        console.error('Error logging in user:', error);
      }
    },
    logoutUser() {
      this.token = null;
      this.user = null;
      const router = useRouter();
      router.push('/');
    },
  },
});

