<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore.ts';

const authStore = useAuthStore();

const navbar = ref<HTMLElement>();

onMounted(() => {
    if (navbar.value) {
        setTimeout(() => {
            navbar.value?.classList.add('navbar-loaded');
        }, 100);
    }
});
</script>

<template>
    <nav class="navbar" ref="navbar">
        <div class="navbar-container">
            <div class="navbar-logo">
                <span class="logo-text">
                    <span
                        class="letter"
                        v-for="(letter, index) in 'MORCHELLA'"
                        :key="index"
                        :data-letter="letter"
                    >
                        {{ letter }}
                    </span>
                </span>
            </div>

            <div class="navbar-center">
                <div class="nav-items">
                    <div class="nav-item dropdown-container">
                        <span class="nav-link">Products</span>
                        <span class="nav-underline"></span>
                    </div>

                    <a href="#" class="nav-item">
                        <span class="nav-link">About</span>
                        <span class="nav-underline"></span>
                    </a>

                    <a class="nav-item">
                        <span class="nav-link">Contacts</span>
                        <span class="nav-underline"></span>
                    </a>

                    <a href="#" class="nav-item" @click="authStore.logout()">
                        <span class="nav-link">Log Out</span>
                        <span class="nav-underline"></span>
                    </a>
                </div>
            </div>

            <div class="navbar-right">
                <button class="submit-request-btn">
                    <span class="btn-text">Submit request</span>
                    <i class="ti ti-mail mail-icon"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    padding: 0 2rem;
    height: 90px;
    display: flex;
    align-items: center;
    position: sticky;
    z-index: 1000;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-loaded {
    transform: translateY(0);
    opacity: 1;
}

.navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
}

.navbar-logo {
    flex: 1;
}

.logo-text {
    font-size: 1.8rem;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    perspective: 500px;
}

.letter {
    display: inline-block;
    position: relative;
    transform-style: preserve-3d;
    transition:
        color 0.3s ease,
        transform 0.3s ease;
    transform-origin: bottom;
}

.logo-text:hover .letter {
    color: #8f867b;
    transform: scale(1.1);
}

.logo-text:hover .letter:nth-child(1) {
    transition-delay: 0s;
}
.logo-text:hover .letter:nth-child(2) {
    transition-delay: 0.05s;
}
.logo-text:hover .letter:nth-child(3) {
    transition-delay: 0.1s;
}
.logo-text:hover .letter:nth-child(4) {
    transition-delay: 0.15s;
}
.logo-text:hover .letter:nth-child(5) {
    transition-delay: 0.2s;
}
.logo-text:hover .letter:nth-child(6) {
    transition-delay: 0.25s;
}
.logo-text:hover .letter:nth-child(7) {
    transition-delay: 0.3s;
}
.logo-text:hover .letter:nth-child(8) {
    transition-delay: 0.35s;
}
.logo-text:hover .letter:nth-child(9) {
    transition-delay: 0.4s;
}

.navbar-center {
    flex: 2;
    display: flex;
    justify-content: center;
}

.nav-items {
    display: flex;
    gap: 3rem;
    align-items: center;
}

.nav-item {
    position: relative;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
}

.nav-link {
    font-size: 1.2rem;
    font-weight: 700;
    color: #333;
    transition: all 0.3s ease;
}

.nav-underline {
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #333;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left;
}

.nav-item:hover .nav-underline {
    width: 100%;
}

.nav-item:hover .nav-link {
    text-decoration: none;
}

.navbar-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

.submit-request-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 2rem;
    background: transparent;
    border: 2px solid #8f867b;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
}

.submit-request-btn:hover {
    transform: translateY(-2px);
}

.mail-icon {
    font-size: 1.4rem;
}

.btn-text {
    white-space: nowrap;
}

@media (max-width: 768px) {
    .navbar {
        padding: 0 1rem;
    }

    .nav-items {
        gap: 1.5rem;
    }

    .logo-text {
        font-size: 1.25rem;
    }

    .submit-request-btn {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    }
}
</style>
