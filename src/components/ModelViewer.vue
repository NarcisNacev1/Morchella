<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import { useModelStore } from '@/stores/useModelStore.ts';

const props = defineProps<{
    modelPath: string;
}>();

const modelContainer = ref<HTMLElement>();
const pureModelViewer = ref<HTMLElement>();
const modelStore = useModelStore();
const isAnimating = ref(false);

const playFadeInAnimation = async () => {
    if (!pureModelViewer.value) return;

    isAnimating.value = true;

    pureModelViewer.value.classList.remove('fade-in-up');
    pureModelViewer.value.classList.remove('fade-out-up');

    await nextTick();

    pureModelViewer.value.classList.add('fade-in-up');

    setTimeout(() => {
        if (pureModelViewer.value) {
            pureModelViewer.value.classList.remove('fade-in-up');
        }
        isAnimating.value = false;
    }, 1200);
};

const playFadeOutAnimation = () => {
    if (!pureModelViewer.value) return;

    return new Promise<void>((resolve) => {
        pureModelViewer.value!.classList.add('fade-out-up');

        setTimeout(() => {
            if (pureModelViewer.value) {
                pureModelViewer.value.classList.remove('fade-out-up');
            }
            resolve();
        }, 600);
    });
};

onMounted(() => {
    modelStore.initScene(modelContainer.value);
    modelStore.preloadAllModels();

    if (props.modelPath) {
        setTimeout(() => {
            modelStore.switchToModel(props.modelPath);
            playFadeInAnimation();
        }, 500);
    }

    modelStore.animate();
    window.addEventListener('resize', modelStore.handleResize);
});

watch(
    () => props.modelPath,
    async (newPath) => {
        if (newPath && !isAnimating.value) {
            await playFadeOutAnimation();
            modelStore.switchToModel(newPath);
            await nextTick();
            playFadeInAnimation();
        }
    }
);
</script>

<template>
    <div ref="pureModelViewer" class="pure-model-viewer">
        <div ref="modelContainer" class="model-canvas"></div>
    </div>
</template>

<style scoped>
.pure-model-viewer {
    width: 1200px;
    height: 1100px;
    background: transparent;
    position: absolute;
    top: 52%;
    left: 50%;
    animation: float 3s ease-in-out infinite;
    opacity: 1;
    transform: translate(-50%, -50%);
}

.model-canvas {
    width: 100%;
    height: 100%;
    background: transparent;
}

.fade-in-up {
    animation: fadeInUp 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.fade-out-up {
    animation: fadeOutUp 0.6s ease-in forwards;
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translate(-50%, 100px) scale(0.8);
    }
    70% {
        opacity: 1;
        transform: translate(-50%, -55%) scale(1.05);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@keyframes fadeOutUp {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -100px) scale(0.9);
    }
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
