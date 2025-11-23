import { defineStore } from 'pinia';
import gsap from 'gsap';
import { ref } from 'vue';

export const useLoginAnimations = defineStore('loginAnimations', () => {
    const container = ref<HTMLElement>();
    const elementRefs = ref<(HTMLElement | null)[]>([]);

    const backgroundElements = ref([
        {
            src: '/login/element1.png',
            alt: 'Element 1',
            x: 1300,
            y: 9,
            width: 80,
            sensitivity: 0.3,
            filter: 'rotate(30deg)'
        },
        {
            src: '/login/element2.png',
            alt: 'Element 2',
            x: 1400,
            y: 720,
            width: 120,
            sensitivity: 0.5
        },
        {
            src: '/login/element3.png',
            alt: 'Element 3',
            x: 1180,
            y: 600,
            width: 60,
            sensitivity: 0.2
        },
        {
            src: '/login/element4.png',
            alt: 'Element 4',
            x: 520,
            y: 300,
            width: 100,
            sensitivity: 0.4
        },
        {
            src: '/login/element5.png',
            alt: 'Element 5',
            x: 600,
            y: 12,
            width: 90,
            sensitivity: 0.6
        },
        {
            src: '/login/element6.png',
            alt: 'Element 6',
            x: 40,
            y: 500,
            width: 70,
            sensitivity: 0.35
        },
        {
            src: '/login/element7.png',
            alt: 'Element 7',
            x: 550,
            y: 570,
            width: 70,
            sensitivity: 0.35
        }
    ]);

    const handleMouseMove = (event: MouseEvent) => {
        if (!container.value) return;

        const rect = container.value.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const deltaX = (mouseX - centerX) / centerX;
        const deltaY = (mouseY - centerY) / centerY;

        backgroundElements.value.forEach((element, index) => {
            const el = elementRefs.value[index];
            if (el) {
                const moveX = deltaX * 40 * element.sensitivity;
                const moveY = deltaY * 40 * element.sensitivity;

                gsap.to(el, {
                    x: moveX,
                    y: moveY,
                    duration: 1.2,
                    ease: 'power2.out'
                });
            }
        });
    };

    const startAnimations = () => {
        backgroundElements.value.forEach((e, index) => {
            const el = elementRefs.value[index];
            if (el) {
                gsap.to(el, {
                    y: '+=15',
                    duration: 2 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.3
                });

                gsap.to(el, {
                    rotation: 5,
                    duration: 3 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.2
                });
            }
        });
    };

    return {
        container,
        backgroundElements,
        elementRefs,
        startAnimations,
        handleMouseMove
    };
});
