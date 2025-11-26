<template>
    <div class="homepage">
        <Navbar />
        <ProductShowcase @product-change="handleProductChange" />
        <ModelViewer :model-path="currentModelPath" />
        <InfoCards :current-model-path="currentModelPath" />
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
.homepage {
    height: 100vh;
    overflow: hidden;
    position: relative;
}
</style>
