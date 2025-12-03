<script setup lang="ts">
import Navbar from '@/components/NavBar.vue';
import ProductShowcase from '@/components/ProductShowcase.vue';
import ModelViewer from '@/components/ModelViewer.vue';
import InfoCards from '@/components/InfoCards.vue';
import { useHomePageStore } from '@/stores/useHomePageStore.ts';
import InfoSection from '@/components/InfoSection.vue';
import ProductsSection from '@/components/ProductsSection.vue';

const homePageStore = useHomePageStore();
</script>

<template>
    <div class="main-container">
        <div class="section section-1">
            <div class="content">
                <Navbar />
                <ProductShowcase @product-change="homePageStore.handleProductChange" />
                <ModelViewer :model-path="homePageStore.currentModelPath" />
                <InfoCards :current-model-path="homePageStore.currentModelPath" />
            </div>
            <div class="scroll-indicator" @click="homePageStore.scrollToSection2">
                <span>Discover More</span>
                <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 5V19M12 19L5 12M12 19L19 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </div>

        <div class="section section-2">
            <InfoSection />
        </div>

        <div class="section section-3">
            <ProductsSection />
        </div>
    </div>
</template>

<style scoped>
.main-container {
    width: 100%;
}

.section {
    width: 100%;
    position: relative;
}

.section-1 {
    height: 100vh;
    z-index: 10;
    overflow: hidden;
    position: relative;
    max-width: 1920px;
    max-height: 1100px;
}

.section-1 .content {
    width: 100%;
    height: 90%;
    position: relative;
    max-width: 1920px;
    max-height: 1100px;
    margin: 0 auto;
}

.scroll-indicator {
    position: absolute;
    right: 30px;
    bottom: 20px;
    color: #f5e9dd;
    text-align: center;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.scroll-indicator:hover {
    opacity: 1;
    transform: translateY(-5px);
}

.scroll-indicator span {
    font-size: 0.9rem;
    font-weight: 500;
    writing-mode: vertical-rl;
    text-orientation: mixed;
}

.arrow-icon {
    animation: float 2s ease-in-out infinite;
    color: #f5e9dd;
}

.arrow-icon.up {
    transform: rotate(180deg);
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-8px);
    }
}

.section-2 {
    height: 70vh;
    background: #1a1a1a;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    overflow: hidden;
    position: relative;
    max-width: 1920px;
    max-height: 1100px;
}

.section-3 {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.back-to-top span {
    font-size: 0.9rem;
    font-weight: 500;
}

@media (max-width: 768px) {
    .section-2-content h2 {
        font-size: 2rem;
    }

    .section-3-content h2 {
        font-size: 2rem;
    }

    .scroll-indicator {
        bottom: 20px;
        right: 20px;
    }

    .scroll-indicator span {
        font-size: 0.8rem;
    }
}

.section {
    user-select: none;
}
</style>
