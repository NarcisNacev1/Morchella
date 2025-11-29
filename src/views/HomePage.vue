<template>
    <div class="container">
        <div class="content">
            <Navbar />
            <ProductShowcase @product-change="handleProductChange" />
            <ModelViewer :model-path="currentModelPath" />
            <InfoCards :current-model-path="currentModelPath" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '@/components/NavBar.vue';
import ProductShowcase from '@/components/ProductShowcase.vue';
import ModelViewer from '@/components/ModelViewer.vue';
import InfoCards from '@/components/InfoCards.vue';

const currentModelPath = ref<string>('/models/morel/scene.gltf');

const handleProductChange = (modelPath: string) => {
    currentModelPath.value = modelPath;
};
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
}

.content {
    width: 100%;
    height: 100%;
    position: relative;
    transform-origin: top left;
    max-width: 1920px;
    max-height: 1100px;
}
</style>
