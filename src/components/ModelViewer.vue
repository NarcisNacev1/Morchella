<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useModelStore } from '@/stores/useModelStore.ts';

const props = defineProps<{
    modelPath: string;
}>();

const modelContainer = ref<HTMLElement>();
const modelStore = useModelStore();

onMounted(() => {
    // Initialize scene first
    modelStore.initScene(modelContainer.value);

    // Load initial model after scene is ready
    if (props.modelPath) {
        modelStore.loadModel(props.modelPath);
    }

    modelStore.animate();
    window.addEventListener('resize', modelStore.handleResize);
});

// Watch for model path changes after initial load
watch(
    () => props.modelPath,
    (newPath) => {
        if (newPath) {
            modelStore.loadModel(newPath);
        }
    }
);
</script>

<template>
    <div class="pure-model-viewer">
        <div ref="modelContainer" class="model-canvas"></div>
    </div>
</template>

<style scoped>
.pure-model-viewer {
    width: 900px;
    height: 900px;
    background: transparent;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float 3s ease-in-out infinite;
}

.model-canvas {
    width: 100%;
    height: 100%;
    background: transparent;
}

@keyframes float {
    0% {
        transform: translate(-50%, -50%);
    }
    50% {
        transform: translate(-50%, -52%);
    }
    100% {
        transform: translate(-50%, -50%);
    }
}
</style>
