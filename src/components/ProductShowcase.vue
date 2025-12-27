<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

interface Product {
    id: number;
    name: string;
    displayName: string;
    modelPath: string;
}

const emit = defineEmits<{
    productChange: [modelPath: string];
}>();

const products = ref<Product[]>([
    {
        id: 1,
        name: 'MOREL',
        displayName: 'MORCHELLA ESCULENTA',
        modelPath: '/models/morel/scene.gltf'
    },
    {
        id: 2,
        name: 'CHANTERELLE',
        displayName: 'CANTHARELLUS',
        modelPath: '/models/chanterelle/scene.gltf'
    },
    {
        id: 3,
        name: 'PORCINI',
        displayName: 'BOLETUS EDULIS',
        modelPath: '/models/porcini/scene.gltf'
    },
    {
        id: 4,
        name: 'AMANITA',
        displayName: 'AMANITA CAESAREA',
        modelPath: '/models/amanita/scene.gltf'
    }
]);

const activeIndex = ref<number>(0);
const activeProduct = ref<Product | undefined>(products.value[0]);
let autoSwitchInterval: number;

const arrowStyle = computed(() => {
    const itemHeight = 44;
    const topPosition = activeIndex.value * itemHeight - 3;
    return {
        transform: `translateY(${topPosition}px)`
    };
});

const setActiveProduct = (index: number) => {
    activeIndex.value = index;
    activeProduct.value = products.value[index];
    emit('productChange', products.value[index]!.modelPath);
};

const autoSwitchToNext = () => {
    const nextIndex = (activeIndex.value + 1) % products.value.length;
    setActiveProduct(nextIndex);
};

onMounted(() => {
    emit('productChange', products.value[0]!.modelPath);
    autoSwitchInterval = globalThis.setInterval(autoSwitchToNext, 8000);
});

onUnmounted(() => {
    clearInterval(autoSwitchInterval);
});
</script>

<template>
    <div class="product-showcase">
        <div class="vertical-menu">
            <div class="moving-arrow" :style="arrowStyle">
                <i class="ti ti-arrow-narrow-right arrow-icon"></i>
            </div>

            <div
                v-for="(product, index) in products"
                :key="product.id"
                class="menu-item"
                :class="{ active: activeIndex === index }"
            >
                <div class="menu-content">
                    <span class="product-name">{{ product.name }}</span>
                </div>
            </div>
        </div>

        <transition name="title-slide" mode="out-in">
            <div class="title-display" :key="activeProduct?.id">
                <h1 class="product-title">{{ activeProduct?.displayName || '' }}</h1>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.product-showcase {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
}

.vertical-menu {
    position: absolute;
    left: 4rem;
    top: 30%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    z-index: 100;
    animation: slideInFromLeft 1s ease-out 0.3s forwards;
    opacity: 0;
    transform: translateX(-100px);
}

@keyframes slideInFromLeft {
    0% {
        opacity: 0;
        transform: translateX(-100px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.moving-arrow {
    position: absolute;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;
}

.arrow-icon {
    font-size: 1.8rem;
    color: #ffffff;
}

.menu-item {
    cursor: default;
    background: transparent;
    position: relative;
    height: 20px;
    display: flex;
    align-items: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: slideInMenuItem 0.8s ease-out forwards;
    opacity: 0;
    transform: translateX(-50px);
}

.menu-item:nth-child(2) {
    animation-delay: 0.5s;
}
.menu-item:nth-child(3) {
    animation-delay: 0.7s;
}
.menu-item:nth-child(4) {
    animation-delay: 0.9s;
}
.menu-item:nth-child(5) {
    animation-delay: 1.1s;
}

@keyframes slideInMenuItem {
    0% {
        opacity: 0;
        transform: translateX(-50px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.menu-content {
    display: flex;
    align-items: center;
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-name {
    font-size: 1.6rem;
    font-weight: 800;
    color: #333;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(0);
}

.menu-item.active .product-name {
    transform: translateX(2rem);
}

.title-display {
    position: absolute;
    z-index: 90;
    padding-bottom: 4rem;
    padding-top: 50rem;
    padding-left: 4rem;
}

.product-title {
    font-size: 8rem;
    font-weight: 900;
    color: #f5e9dd;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}

.title-slide-enter-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.title-slide-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.title-slide-enter-from {
    opacity: 0;
    transform: translateY(80px) scale(0.95);
}

.title-slide-leave-to {
    opacity: 0;
    transform: translateY(-50px) scale(0.98);
}

.title-slide-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.title-slide-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}

@media (max-width: 768px) {
    .vertical-menu {
        left: 1rem;
        top: 25%;
    }

    .moving-arrow {
        left: -1.5rem;
    }

    .product-name {
        font-size: 1.4rem;
    }

    .arrow-icon {
        font-size: 1.5rem;
    }

    .menu-item.active .product-name {
        transform: translateX(0.6rem);
    }

    .title-display {
        left: 2rem;
        bottom: 2rem;
    }

    .product-title {
        font-size: 3rem;
    }

    .title-slide-enter-from {
        transform: translateY(60px) scale(0.95);
    }
}

@media (max-width: 480px) {
    .vertical-menu {
        left: 1rem;
        top: 20%;
    }

    .moving-arrow {
        left: -1.2rem;
    }

    .menu-item.active .product-name {
        transform: translateX(0.4rem);
    }

    .title-display {
        left: 1rem;
        bottom: 1rem;
    }

    .product-title {
        font-size: 2.5rem;
    }

    .title-slide-enter-from {
        transform: translateY(40px) scale(0.95);
    }
}
</style>
