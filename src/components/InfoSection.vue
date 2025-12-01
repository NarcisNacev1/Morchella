<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const isVisible = ref(false);

const sectionData = [
    {
        title: 'Premium Quality',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        title: 'Sustainable Harvest',
        content:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        title: 'Expertly Curated',
        content:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
        title: 'Fresh Delivery',
        content:
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
];

const checkVisibility = () => {
    const element = document.querySelector('.section-2-content');
    if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
            isVisible.value = true;
        }
    }
};

onMounted(() => {
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkVisibility);
});
</script>

<template>
    <div class="section-2-content">
        <div class="content-layout">
            <!-- Left side - Entire section fades in together -->
            <div class="left-content" :class="{ 'animate-in': isVisible }">
                <div class="content-item" v-for="(item, index) in sectionData" :key="index">
                    <div class="divider-line" :style="{ animationDelay: `${index * 0.2}s` }"></div>
                    <div class="item-content">
                        <h3 class="item-title" :style="{ animationDelay: `${index * 0.2 + 0.1}s` }">
                            {{ item.title }}
                        </h3>
                        <p class="item-text" :style="{ animationDelay: `${index * 0.2 + 0.15}s` }">
                            {{ item.content }}
                        </p>
                    </div>
                </div>
                <div
                    class="divider-line"
                    :style="{ animationDelay: `${sectionData.length * 0.2}s` }"
                ></div>
            </div>

            <!-- Right side - Fades in after left side completes -->
            <div class="right-content" :class="{ 'animate-in': isVisible }">
                <h2 class="right-title">Why Choose Our Mushrooms?</h2>
                <p class="intro-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.section-2-content {
    max-width: 1920px;
    padding: 4rem;
    color: #f5e9dd;
    width: 100%;
    margin: 0 auto;
}

.content-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

/* Left side styles - Entire section animates together */
.left-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-top: 0.5rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}

.left-content.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.content-item {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.divider-line {
    height: 1px;
    background: linear-gradient(
        90deg,
        rgba(245, 233, 221, 0.1) 0%,
        rgba(245, 233, 221, 0.4) 50%,
        rgba(245, 233, 221, 0.8) 100%
    );
    width: 0%;
    opacity: 0;
    animation: snakeSlide 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-play-state: paused;
    position: relative;
    overflow: hidden;
}

.divider-line::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(245, 233, 221, 0.6) 0%, rgba(245, 233, 221, 1) 100%);
    transform: translateX(100%);
    animation: snakeHead 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-play-state: paused;
}

.left-content.animate-in .divider-line {
    animation-play-state: running;
    opacity: 1;
}

.left-content.animate-in .divider-line::before {
    animation-play-state: running;
}

.item-content {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 3rem;
    align-items: start;
}

.item-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #f5e9dd;
    letter-spacing: 1px;
    margin: 0;
    min-width: 160px;
    text-align: right;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.4s ease-out;
    transition-delay: 0s;
}

.left-content.animate-in .item-title {
    opacity: 1;
    transform: translateX(0);
}

.item-text {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(245, 233, 221, 0.8);
    margin: 0;
    text-align: right;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.4s ease-out;
    transition-delay: 0s;
}

.left-content.animate-in .item-text {
    opacity: 1;
    transform: translateX(0);
}

/* Right side styles - Fades in after left side */
.right-content {
    padding-top: 0.5rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 1.2s; /* Delay to wait for left side */
}

.right-content.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.right-title {
    font-size: 3rem;
    margin-bottom: 2rem;
    font-weight: 300;
    letter-spacing: 2px;
    line-height: 1.2;
}

.intro-text {
    font-size: 1.2rem;
    line-height: 1.8;
    color: rgba(245, 233, 221, 0.9);
    max-width: 500px;
}

/* Faster snake animations */
@keyframes snakeSlide {
    0% {
        width: 0%;
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    100% {
        width: 100%;
        opacity: 1;
    }
}

@keyframes snakeHead {
    0% {
        transform: translateX(100%);
        opacity: 1;
    }
    80% {
        transform: translateX(-100%);
        opacity: 1;
    }
    100% {
        transform: translateX(-100%);
        opacity: 0;
    }
}

/* Responsive design */
@media (max-width: 1024px) {
    .content-layout {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .left-content {
        max-width: 600px;
        margin: 0 auto;
        padding-top: 0;
    }

    .right-content {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
    }

    .item-content {
        text-align: left;
        gap: 2rem;
    }

    .item-title,
    .item-text {
        text-align: left;
        transform: translateX(20px);
    }

    .left-content.animate-in .item-title,
    .left-content.animate-in .item-text {
        transform: translateX(0);
    }

    .divider-line {
        width: 100% !important;
    }
}

@media (max-width: 768px) {
    .section-2-content {
        padding: 3rem 2rem;
    }

    .right-title {
        font-size: 2.5rem;
    }

    .intro-text {
        font-size: 1.1rem;
    }

    .item-title {
        font-size: 1.3rem;
        min-width: 140px;
    }

    .item-text {
        font-size: 0.95rem;
    }

    .content-layout {
        gap: 2rem;
    }

    .left-content {
        gap: 2rem;
    }

    .content-item {
        gap: 1rem;
    }

    .item-content {
        gap: 1.5rem;
    }
}

@media (max-width: 480px) {
    .section-2-content {
        padding: 2rem 1.5rem;
    }

    .right-title {
        font-size: 2rem;
    }

    .intro-text {
        font-size: 1rem;
    }

    .item-content {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }

    .item-title {
        min-width: auto;
        text-align: left;
    }

    .item-text {
        text-align: left;
    }
}
</style>
