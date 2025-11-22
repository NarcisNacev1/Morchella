import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const vueApp = createApp(App);

vueApp.use(createPinia());
vueApp.use(router);

vueApp.mount('#app');
