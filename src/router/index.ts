import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import PasswordReset from '@/views/PasswordReset.vue';
import HomePage from '@/views/HomePage.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/forgot-password',
        name: 'PasswordReset',
        component: PasswordReset
    },
    {
        path: '/homepage',
        name: 'HomePage',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        redirect: '/homepage'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (authStore.isLoading) {
        await authStore.initAuth();
    }

    const isAuthenticated = authStore.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' });
        return;
    }

    if (
        isAuthenticated &&
        (to.name === 'Login' || to.name === 'Register' || to.name === 'PasswordReset')
    ) {
        next({ name: 'HomePage' });
        return;
    }

    next();
});

export default router;
