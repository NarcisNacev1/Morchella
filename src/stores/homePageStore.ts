import { onMounted, onUnmounted, ref } from 'vue';
import { defineStore } from 'pinia';

export const useHomePageStore = defineStore('homePageStore', () => {
    const currentModelPath = ref<string>('/models/morel/scene.gltf');
    const isAnimating = ref(false);

    const mushrooms = ref([
        {
            id: 1,
            name: 'Morel',
            description: 'Spring delicacy with honeycomb appearance'
        },
        {
            id: 2,
            name: 'Chanterelle',
            description: 'Golden trumpet-shaped forest treasure'
        },
        {
            id: 3,
            name: 'Porcini',
            description: 'King of mushrooms with rich umami flavor'
        },
        {
            id: 4,
            name: 'Amanita',
            description: 'Iconic red-capped mythical mushroom'
        }
    ]);

    const handleProductChange = (modelPath: string) => {
        currentModelPath.value = modelPath;
    };

    const scrollToSection1 = () => {
        if (isAnimating.value) return;
        isAnimating.value = true;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isAnimating.value = false;
        }, 1000);
    };

    const scrollToSection2 = () => {
        if (isAnimating.value) return;
        isAnimating.value = true;

        window.scrollTo({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isAnimating.value = false;
        }, 1000);
    };

    const scrollToSection3 = () => {
        if (isAnimating.value) return;
        isAnimating.value = true;

        window.scrollTo({
            top: window.innerHeight + window.innerHeight * 0.5 - 100,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isAnimating.value = false;
        }, 1000);
    };

    const handleWheel = (event: WheelEvent) => {
        if (isAnimating.value) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;

        if (event.deltaY > 0) {
            if (scrollTop < viewportHeight * 0.1) {
                event.preventDefault();
                scrollToSection2();
            } else if (scrollTop < viewportHeight * 0.8) {
                event.preventDefault();
                scrollToSection3();
            }
        } else if (event.deltaY < 0) {
            if (scrollTop > viewportHeight * 1.2) {
                event.preventDefault();
                scrollToSection2();
            } else if (scrollTop > viewportHeight * 0.3) {
                event.preventDefault();
                scrollToSection1();
            }
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (isAnimating.value) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;

        if (event.key === 'ArrowDown' && scrollTop < viewportHeight * 0.1) {
            event.preventDefault();
            scrollToSection2();
        } else if (event.key === 'ArrowUp' && scrollTop > viewportHeight * 1.2) {
            event.preventDefault();
            scrollToSection1();
        }
    };

    onMounted(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeydown);
    });

    return {
        handleProductChange,
        currentModelPath,
        mushrooms,
        scrollToSection1,
        scrollToSection2,
        scrollToSection3
    };
});
