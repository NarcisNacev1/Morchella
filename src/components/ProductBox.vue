<script lang="ts" setup>
interface Props {
    imageUrl: string;
    title: string;
    hasRightBorder?: boolean;
    hasBottomBorder?: boolean;
    hasLeftBorder?: boolean;
    hasTopBorder?: boolean;
}

withDefaults(defineProps<Props>(), {
    hasRightBorder: false,
    hasBottomBorder: false,
    hasLeftBorder: false,
    hasTopBorder: false
});
</script>

<template>
    <div
        class="product-box"
        :class="{
            'has-right-border': hasRightBorder,
            'has-bottom-border': hasBottomBorder,
            'has-left-border': hasLeftBorder,
            'has-top-border': hasTopBorder
        }"
    >
        <div class="image-container">
            <img
                :src="imageUrl"
                :alt="title"
                class="mushroom-image"
            />
        </div>
        <div class="product-name">{{ title }}</div>
    </div>
</template>

<style scoped>
.product-box {
    width: 320px;
    height: 300px;
    position: relative;
    overflow: hidden;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.product-box.has-right-border {
    border-right: 2px solid #1A1A1A;
}

.product-box.has-bottom-border {
    border-bottom: 2px solid #1A1A1A;
}

.product-box.has-left-border {
    border-left: 2px solid #1A1A1A;
}

.product-box.has-top-border {
    border-top: 2px solid #1A1A1A;
}

.image-container {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.mushroom-image {
    width: 150px;
    height: 150px;
    object-fit: contain;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
}

.product-box:hover .mushroom-image {
    transform: scale(1.2) rotate(3deg);
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
}

.product-name {
    position: absolute;
    bottom: -15px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: #1A1A1A;
    padding: 18px 0;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.3s ease;
}

.product-box:hover .product-name {
    color: #000;
    font-weight: 700;
    letter-spacing: 1.2px;
}

.product-box::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(197, 188, 176, 0.1) 0%, rgba(245, 233, 221, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: -1;
}

.product-box:hover::after {
    opacity: 1;
}

@media (max-width: 1200px) {
    .product-box {
        width: 300px;
        height: 300px;
    }

    .mushroom-image {
        width: 90px;
        height: 90px;
    }

    .product-name {
        font-size: 0.95rem;
        padding: 16px 0;
        letter-spacing: 0.9px;
    }
}

@media (max-width: 1000px) {
    .product-box {
        width: 250px;
        height: 250px;
    }

    .mushroom-image {
        width: 85px;
        height: 85px;
    }

    .product-name {
        font-size: 0.85rem;
        padding: 15px 0;
        letter-spacing: 0.8px;
    }
}

@media (max-width: 800px) {
    .product-box {
        width: 200px;
        height: 200px;
    }

    .mushroom-image {
        width: 75px;
        height: 75px;
    }

    .product-name {
        font-size: 0.75rem;
        padding: 13px 0;
        letter-spacing: 0.7px;
    }
}

@media (max-width: 600px) {
    .product-box {
        width: 175px;
        height: 175px;
    }

    .mushroom-image {
        width: 70px;
        height: 70px;
    }

    .product-name {
        font-size: 0.7rem;
        padding: 12px 0;
        letter-spacing: 0.6px;
    }
}
</style>
