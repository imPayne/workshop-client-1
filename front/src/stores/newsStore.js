import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = "http://localhost:3000";

export const useNewsStore = defineStore('news', {
    state: () => ({
      news: [],
    }),
    actions: {
      async fetchNews() {
        try {
          const response = await axios.get(baseUrl+'/adverts');
          this.news = response.data;
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      },
      async addNews(newAdvert) {
        try {
          const response = await axios.post(baseUrl+'/adverts/create', newAdvert);
          this.news.push(response.data);
        } catch (error) {
          console.error('Error adding news:', error);
        }
      },
      async deleteNews(id) {
        try {
          await axios.delete(baseUrl+`/adverts/${id}`);
          this.news = this.news.filter(advert => advert.id !== id);
        } catch (error) {
          console.error('Error deleting news:', error);
        }
      },
    },
  });
