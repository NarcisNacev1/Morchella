<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { onMounted } from 'vue';
import ToastNotifications from '@/components/ToastNotifications.vue';

const authStore = useAuthStore();

onMounted(() => {
    authStore.initAuth();
});
</script>

<template>
    <ToastNotifications />
    <div class="router">
        <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </RouterView>
    </div>
</template>

<style scoped>
.router {
    background: radial-gradient(circle, #d9ccbe 0%, #a4a199 100%);
    min-height: 100vh;
    width: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
