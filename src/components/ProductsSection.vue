<script lang="ts" setup>
import Products from '@/components/Products.vue';
import { onMounted, ref } from 'vue';

const isVisible = ref(false);

const checkVisibility = () => {
    const element = document.querySelector('.intro-section');
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

    return () => {
        window.removeEventListener('scroll', checkVisibility);
    };
});
</script>
<template>
    <div class="intro-section">
        <h2 class="products-title-left">PRODUCTS</h2>

        <div class="right-section">
            <div class="intro-content">
                <div class="intro-text" :class="{ 'animate-in': isVisible }">
                    <h1 class="intro-title">Discover a wide array <br> of high-quality products at Morchella, tailored to meet your needs</h1>
                    <p class="intro-description">
                        Our dedicated team is committed to delivering top-tier products, ensuring
                        each mushroom meets our rigorous standards of quality, sustainability, and flavor.
                        From forest to table, we maintain the highest level of care in every step of our process.
                    </p>
                </div>
            </div>
            <Products />
        </div>
    </div>
</template>

<style scoped>
.intro-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    gap: 4rem;
    padding: 5.2rem 4rem 0 4rem;

}

.products-title-left {
    font-size: 1rem;
    color: #f5e9dd;
    margin: 0;
    padding: 2rem 0 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    top: 5.2rem;
    height: fit-content;
    text-align: left;
    width: auto;
    flex-shrink: 0;
}

.right-section {
    max-width: 79%;
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.intro-content {
    width: 100%;
}

.intro-text {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0.2s;
}

.intro-text.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.intro-title {
    font-size: 4rem;
    width: 100%;
    font-weight: 900;
    color: #1A1A1A;
    margin: 0 0 1.5rem 0;
    line-height: 1.1;
    padding-top: 1rem;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
}

.intro-description {
    font-size: 1.125rem;
    font-weight: 400;
    width: 100%;
    color: #666;
    line-height: 1.8;
    max-width: 730px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0.6s;
    text-align: left;
}

.intro-text.animate-in .intro-description {
    opacity: 1;
    transform: translateY(0);
}

.right-section > :deep(.products-component) {
    width: 100%;
    margin-top: 3rem;
}

@media (max-width: 1200px) {
    .intro-section {
        padding: 5.2rem 3rem 0 3rem;
        gap: 3rem;
    }

    .products-title-left {
        font-size: 6rem;
        top: 5.2rem;
    }

    .right-section {
        max-width: 85%;
    }

    .intro-title {
        font-size: 3.5rem;
    }
}

@media (max-width: 1024px) {
    .intro-section {
        padding: 4rem 2rem 0 2rem;
        gap: 2rem;
    }

    .products-title-left {
        font-size: 5rem;
        top: 4rem;
    }

    .right-section {
        max-width: 90%;
    }

    .intro-title {
        font-size: 3rem;
    }
}

@media (max-width: 768px) {
    .intro-section {
        flex-direction: column;
        padding: 3rem 1.5rem 0 1.5rem;
        gap: 1rem;
    }

    .products-title-left {
        position: relative;
        top: 0;
        font-size: 3.5rem;
        text-align: center;
        width: 100%;
        margin-bottom: 1rem;
    }

    .right-section {
        max-width: 100%;
        width: 100%;
    }

    .intro-title {
        font-size: 2.5rem;
        text-align: left;
    }

    .intro-description {
        font-size: 1rem;
        text-align: left;
    }
}

@media (max-width: 480px) {
    .intro-section {
        padding: 2rem 1rem 0 1rem;
    }

    .products-title-left {
        font-size: 2.5rem;
    }

    .intro-title {
        font-size: 2rem;
    }

    .intro-description {
        font-size: 0.95rem;
    }
}

.intro-section + * {
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
