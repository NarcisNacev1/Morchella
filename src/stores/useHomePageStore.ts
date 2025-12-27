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

    const getSections = () => {
        const vh = window.innerHeight;
        return [
            0,
            vh * 0.8,
            vh * 1.8
        ];
    };

    const getCurrentSection = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sections = getSections();

        if (scrollTop >= (sections[2] ?? 0) - 50) return 2;
        if (scrollTop >= (sections[1] ?? 0) - 50) return 1;
        return 0;
    };

    const scrollToSection = (sectionIndex: number) => {
        if (isAnimating.value) return;

        const sections = getSections();
        if (sectionIndex < 0 || sectionIndex >= sections.length) return;

        isAnimating.value = true;

        window.scrollTo({
            top: sections[sectionIndex],
            behavior: 'smooth'
        });

        setTimeout(() => {
            isAnimating.value = false;
        }, 1000);
    };

    const handleProductChange = (modelPath: string) => {
        currentModelPath.value = modelPath;
    };

    const handleWheel = (event: WheelEvent) => {
        if (isAnimating.value) return;

        const current = getCurrentSection();
        const direction = event.deltaY > 0 ? 1 : -1;
        const nextSection = current + direction;

        // Only prevent default and snap if we're moving to a valid section
        if (nextSection >= 0 && nextSection < getSections().length) {
            event.preventDefault();
            scrollToSection(nextSection);
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (isAnimating.value) return;
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

        event.preventDefault();

        const current = getCurrentSection();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        scrollToSection(current + direction);
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
        scrollToSection1: () => scrollToSection(0),
        scrollToSection2: () => scrollToSection(1),
        scrollToSection3: () => scrollToSection(2)
    };
});
