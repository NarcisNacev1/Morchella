<script lang="ts" setup>
import { useHomePageStore } from '@/stores/homePageStore.ts';

const homePageStore = useHomePageStore();
</script>

<template>
    <div class="section-3-content">
        <h2>More Content Coming Soon</h2>
        <p>This will be your next section</p>

        <div class="back-to-top" @click="homePageStore.scrollToSection1">
            <span>Back to Top</span>
            <svg class="arrow-icon up" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 19V5M12 5L5 12M12 5L19 12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    </div>
</template>

<style scoped>
.section-3-content {
    text-align: center;
    max-width: 600px;
    padding: 2rem;
}

.section-3-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 300;
}

.section-3-content p {
    color: rgba(245, 233, 221, 0.8);
    margin-bottom: 2rem;
}

/* Back to Top */
.back-to-top {
    color: #f5e9dd;
    text-align: center;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.back-to-top:hover {
    opacity: 1;
    transform: translateY(-5px);
}

@media (max-width: 768px) {
    .section-3-content h2 {
        font-size: 2rem;
    }
}
</style>
