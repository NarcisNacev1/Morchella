<template>
    <div class="info-cards-container">
        <div
            v-for="card in currentModelCards"
            :key="`${currentModelPath}-${card.id}`"
            class="info-card"
            :style="{
                left: card.x + 'px',
                top: card.y + 'px',
            }"
            :data-card-id="`${currentModelPath}-${card.id}`"
        >
            <h3 class="card-title">
                {{ card.title }}
            </h3>
            <p class="card-content">{{ card.content }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, watch } from 'vue';
import gsap from 'gsap';

interface InfoCard {
    id: number;
    title: string;
    content: string;
    x: number;
    y: number;
    slideFrom: 'left' | 'right';
}

interface Props {
    currentModelPath: string;
}

const props = defineProps<Props>();

let animations: gsap.core.Tween[] = [];

const modelCards: Record<string, InfoCard[]> = {
    '/models/morel/scene.gltf': [
        {
            id: 1,
            title: 'RARE',
            content: 'Spring delicacy',
            x: 650,
            y: 280,
            slideFrom: 'left'
        },
        {
            id: 2,
            title: 'NUTTY',
            content: 'Earthy flavor',
            x: 1000,
            y: 450,
            slideFrom: 'right'
        }
    ],
    '/models/chanterelle/scene.gltf': [
        {
            id: 1,
            title: 'GOLD',
            content: 'Forest treasure',
            x: 550,
            y: 280,
            slideFrom: 'left'
        },
        {
            id: 3,
            title: 'AROMA',
            content: 'Fruity notes',
            x: 1150,
            y: 240,
            slideFrom: 'right'
        }
    ],
    '/models/porcini/scene.gltf': [
        {
            id: 1,
            title: 'KING',
            content: 'Rich umami',
            x: 550,
            y: 250,
            slideFrom: 'left'
        },
        {
            id: 2,
            title: 'HEARTY',
            content: 'Meaty texture',
            x: 1200,
            y: 200,
            slideFrom: 'right'
        },
        {
            id: 3,
            title: 'CLASSIC',
            content: 'Italian cuisine',
            x: 730,
            y: 300,
            slideFrom: 'left'
        }
    ],
    '/models/amanita/scene.gltf': [
        {
            id: 1,
            title: 'ICON',
            content: 'Red cap',
            x: 1100,
            y: 150,
            slideFrom: 'right'
        },
        {
            id: 2,
            title: 'MYTH',
            content: 'Fairy tales',
            x: 650,
            y: 400,
            slideFrom: 'left'
        }
    ]
};

const currentModelCards = computed(() => {
    return modelCards[props.currentModelPath] || [];
});

const killAllAnimations = () => {
    animations.forEach((anim) => anim.kill());
    animations = [];
    gsap.killTweensOf('.info-card');
};

const startFloatingAnimations = () => {
    killAllAnimations();

    const cards = document.querySelectorAll('.info-card');

    cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardId = cardElement.dataset.cardId;

        const cardData = currentModelCards.value.find(
            (c) => `${props.currentModelPath}-${c.id}` === cardId
        );

        if (cardData) {
            const slideDistance = cardData.slideFrom === 'left' ? -100 : 100;

            gsap.fromTo(
                card,
                {
                    x: slideDistance,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: index * 0.15
                }
            );
        }

        const floatAnim = gsap.to(card, {
            y: '+=15',
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.8 + index * 0.3
        });
        animations.push(floatAnim);

        const rotateAnim = gsap.to(card, {
            rotation: 3,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.8 + index * 0.2
        });
        animations.push(rotateAnim);
    });
};

watch(
    () => props.currentModelPath,
    () => {
        nextTick(() => {
            startFloatingAnimations();
        });
    },
    { immediate: true }
);

onBeforeUnmount(() => {
    killAllAnimations();
});
</script>

<style scoped>
.info-cards-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
}

.info-card {
    position: relative;
    max-width: 130px;
    min-height: 130px;
    padding: 20px;
    background: rgba(245, 233, 221, 0.5);
    backdrop-filter: blur(4px);
    border-radius: 16px;
    border: 1px solid rgba(185, 178, 167, 0.3);
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.15),
        0 2px 8px rgba(0, 0, 0, 0.1);
    pointer-events: auto;
    transition: all 0.3s ease;
    z-index: 1;
    opacity: 0;
}

.card-title {
    font-size: 1.1em;
    font-weight: 700;
    margin: 0 12px 12px 0;
    color: rgba(245, 233, 221, 1);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.card-content {
    font-size: 0.9em;
    line-height: 1.5;
    color: #a8a49c;
    font-weight: 700;
    margin: 0 0 12px 0;

    position: absolute;
    bottom: 0;
    left: 12px;
    text-align: left;
}

@media (max-width: 768px) {
    .info-card {
        max-width: 220px;
        padding: 16px;
    }

    .card-title {
        font-size: 1em;
    }

    .card-content {
        font-size: 0.85em;
    }
}

@media (max-width: 480px) {
    .info-cards-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }

    .info-card {
        position: relative !important;
        max-width: 85%;
        left: auto !important;
        top: auto !important;
    }
}
</style>
