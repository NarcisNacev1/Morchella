import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import PasswordReset from '@/views/PasswordReset.vue';

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/forgot-password', name: 'PasswordReset', component: PasswordReset }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
