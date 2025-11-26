<template>
    <div class="info-cards-container">
        <div
            v-for="card in currentModelCards"
            :key="card.id"
            class="info-card"
            :style="{
                left: card.x + 'px',
                top: card.y + 'px',
            }"
        >
            <h3 class="card-title">
                {{ card.title }}
            </h3>
            <p class="card-content">{{ card.content }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import gsap from 'gsap';

interface InfoCard {
    id: number;
    title: string;
    content: string;
    x: number;
    y: number;
}

interface Props {
    currentModelPath: string;
}

const props = defineProps<Props>();

// Define card data for each model with manual x,y coordinates
const modelCards: Record<string, InfoCard[]> = {
    '/models/morel/scene.gltf': [
        {
            id: 1,
            title: 'Premium Quality',
            content:
                'Handcrafted with premium materials and attention to detail that ensures longevity and exceptional performance.',
            x: 650,
            y: 280
        },
        {
            id: 2,
            title: 'Innovative Design',
            content:
                'Features cutting-edge technology and ergonomic design for superior comfort and user experience.',
            x: 1000,
            y: 700
        }
    ],
    '/models/chanterelle/scene.gltf': [
        {
            id: 1,
            title: 'Crystal Clear Audio',
            content:
                'Experience immersive sound quality with noise cancellation and high-fidelity audio drivers.',
            x: 550,
            y: 280
        },
        {
            id: 3,
            title: 'Wireless Freedom',
            content:
                'Up to 30 hours of battery life with quick charge technology and seamless connectivity.',
            x: 1150,
            y: 240
        }
    ],
    '/models/porcini/scene.gltf': [
        {
            id: 1,
            title: 'Premium Build',
            content:
                'Crafted with precision and high-quality materials for exceptional durability.',
            x: 550,
            y: 250
        },
        {
            id: 2,
            title: 'Smart Features',
            content:
                'Integrated with smart technology for enhanced functionality and user experience.',
            x: 1200,
            y: 450
        },
        {
            id: 3,
            title: 'Advanced Technology',
            content:
                'Integrated with smart technology for enhanced functionality and user experience.',
            x: 730,
            y: 650
        }
    ],
    '/models/amanita/scene.gltf': [
        {
            id: 1,
            title: 'Premium Build',
            content:
                'Crafted with precision and high-quality materials for exceptional durability.',
            x: 1100,
            y: 150
        },
        {
            id: 2,
            title: 'Smart Features',
            content:
                'Integrated with smart technology for enhanced functionality and user experience.',
            x: 650,
            y: 500
        }
    ]
};

// Compute current model cards based on active model path
const currentModelCards = computed(() => {
    return modelCards[props.currentModelPath] || [];
});

// Start floating animations
const startFloatingAnimations = () => {
    const cards = document.querySelectorAll('.info-card');

    cards.forEach((card, index) => {
        // Floating up/down animation
        gsap.to(card, {
            y: '+=15',
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3
        });

        // Subtle rotation animation
        gsap.to(card, {
            rotation: 3,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
    });
};

onMounted(() => {
    // Start animations after a brief delay to ensure DOM is ready
    setTimeout(startFloatingAnimations, 100);
});
</script>

<style scoped>
/* Info Cards Container */
.info-cards-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
}

/* Individual Info Card */
.info-card {
    position: absolute;
    max-width: 150px;
    min-height: 150px;
    padding: 20px;
    background: rgba(217, 204, 190, 0.7); /* #d9ccbe with transparency */
    backdrop-filter: blur(4px); /* stronger blur for glass effect */
    border-radius: 16px;
    border: 1px solid rgba(185, 178, 167, 0.3);
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.15),
        0 2px 8px rgba(0, 0, 0, 0.1);
    pointer-events: auto;
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;
    z-index: 1;
}

.info-card:hover {
    transform: translateY(-2px);
    box-shadow:
        0 12px 40px rgba(0, 0, 0, 0.2),
        0 4px 12px rgba(0, 0, 0, 0.12);
    background: rgba(185, 178, 167, 0.95);
}

/* Card Title */
.card-title {
    font-size: 1.1em;
    font-weight: 700;
    margin: 0 0 12px 0;
    color: #8a8376; /* Darker version of #B9B2A7 */
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    letter-spacing: -0.01em;
}

/* Card Content */
.card-content {
    font-size: 0.9em;
    line-height: 1.5;
    margin: 0;
    color: #2c3e50;
    font-weight: 400;
}

/* Animation */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
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
