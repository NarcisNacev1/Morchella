<script setup lang="ts">
import { useToastStore } from '@/stores/useToastsStore';

const toastStore = useToastStore();

const getIcon = (type: string) => {
    switch (type) {
    case 'success':
        return '✓';
    case 'error':
        return '✕';
    case 'warning':
        return '⚠';
    case 'info':
        return 'ℹ';
    default:
        return '';
    }
};
</script>

<template>
    <div class="glass-cloud-container">
        <TransitionGroup name="glass-cloud">
            <div
                v-for="toast in toastStore.toasts"
                :key="toast.id"
                :class="['glass-cloud', `glass-cloud--${toast.type}`]"
                @click="toastStore.remove(toast.id)"
            >
                <div class="glass-cloud__main">
                    <div class="glass-cloud__bubbles">
                        <div class="glass-cloud__bubble glass-cloud__bubble--1"></div>
                        <div class="glass-cloud__bubble glass-cloud__bubble--2"></div>
                        <div class="glass-cloud__bubble glass-cloud__bubble--3"></div>
                        <div class="glass-cloud__bubble glass-cloud__bubble--4"></div>
                    </div>

                    <div class="glass-cloud__content">
                        <div class="glass-cloud__icon-wrapper">
                            <span class="glass-cloud__icon">{{ getIcon(toast.type) }}</span>
                        </div>
                        <span class="glass-cloud__message">{{ toast.message }}</span>
                    </div>
                </div>

                <div class="glass-cloud__accent"></div>
                <div class="glass-cloud__glow"></div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.glass-cloud-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
}

.glass-cloud {
    position: relative;
    cursor: pointer;
    pointer-events: all;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.12));
}

.glass-cloud__main {
    position: relative;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.15) 100%
    );
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    padding: 16px 20px;
    min-width: 280px;
    max-width: 320px;
    overflow: hidden;
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(0, 0, 0, 0.05),
        0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-cloud__bubbles {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.glass-cloud__bubble {
    position: absolute;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    backdrop-filter: blur(10px);
}

.glass-cloud__bubble--1 {
    width: 28px;
    height: 28px;
    top: -12px;
    left: 30px;
}

.glass-cloud__bubble--2 {
    width: 22px;
    height: 22px;
    top: -8px;
    right: 40px;
}

.glass-cloud__bubble--3 {
    width: 18px;
    height: 18px;
    bottom: -6px;
    left: 25px;
}

.glass-cloud__bubble--4 {
    width: 20px;
    height: 20px;
    bottom: -4px;
    right: 30px;
}

/* Content */
.glass-cloud__content {
    display: flex;
    align-items: center;
    gap: 14px;
    position: relative;
    z-index: 2;
}

.glass-cloud__icon-wrapper {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
}

.glass-cloud__icon {
    font-size: 16px;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.glass-cloud__message {
    flex: 1;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.4;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.2px;
}

.glass-cloud__accent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.6) 50%,
        transparent 100%
    );
}

.glass-cloud__glow {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 60%;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transform: translateY(-50%);
    z-index: 1;
    pointer-events: none;
}

.glass-cloud--success .glass-cloud__icon-wrapper {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.8), rgba(56, 142, 60, 0.6));
    box-shadow:
        0 4px 16px rgba(76, 175, 80, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.glass-cloud--error .glass-cloud__icon-wrapper {
    background: linear-gradient(135deg, rgba(244, 67, 54, 0.8), rgba(211, 47, 47, 0.6));
    box-shadow:
        0 4px 16px rgba(244, 67, 54, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.glass-cloud--warning .glass-cloud__icon-wrapper {
    background: linear-gradient(135deg, rgba(255, 152, 0, 0.8), rgba(245, 124, 0, 0.6));
    box-shadow:
        0 4px 16px rgba(255, 152, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.glass-cloud--info .glass-cloud__icon-wrapper {
    background: linear-gradient(135deg, rgba(33, 150, 243, 0.8), rgba(25, 118, 210, 0.6));
    box-shadow:
        0 4px 16px rgba(33, 150, 243, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.glass-cloud:hover {
    transform: translateX(-4px);
    filter: drop-shadow(0 12px 40px rgba(0, 0, 0, 0.15));
}

.glass-cloud:hover .glass-cloud__main {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%);
}

.glass-cloud:hover .glass-cloud__icon-wrapper {
    transform: scale(1.05);
    transition: transform 0.2s ease;
}

.glass-cloud-enter-active,
.glass-cloud-leave-active {
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.glass-cloud-enter-from {
    opacity: 0;
    transform: translateX(80px) scale(0.9);
    filter: blur(8px);
}

.glass-cloud-leave-to {
    opacity: 0;
    transform: translateX(80px) scale(0.9);
    filter: blur(8px);
}

.glass-cloud-move {
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.glass-cloud-enter-active .glass-cloud__main {
    animation: glassSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes glassSlideIn {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .glass-cloud-container {
        top: 10px;
        right: 10px;
        left: 10px;
    }

    .glass-cloud__main {
        min-width: auto;
        width: 100%;
        max-width: none;
    }

    .glass-cloud:hover {
        transform: none;
    }
}

.glass-cloud:hover .glass-cloud__main {
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(0, 0, 0, 0.05),
        0 8px 40px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.1);
}
</style>
