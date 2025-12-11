<script lang="ts" setup>
interface Props {
    imageUrl: string;
    title: string;
    hasRightBorder?: boolean;
    hasBottomBorder?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    hasRightBorder: true,
    hasBottomBorder: true
});
</script>

<template>
    <div
        class="product-box"
        :class="{
            'no-right-border': !props.hasRightBorder,
            'no-bottom-border': !props.hasBottomBorder
        }"
    >
        <div class="image-container">
            <img :src="imageUrl" :alt="title" />
        </div>
        <div class="product-name">{{ title }}</div>
    </div>
</template>

<style scoped>
.product-box {
    width: 350px;
    height: 350px;
    border-right: 2px solid #1A1A1A;
    border-bottom: 2px solid #1A1A1A;
    position: relative;
    overflow: hidden;
    background: transparent;
}

.product-box.no-right-border {
    border-right: none;
}

.product-box.no-bottom-border {
    border-bottom: none;
}

.image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
}

.image-container img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
}

.product-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: #1A1A1A;
    padding: 8px 0;
    background: rgba(255, 255, 255, 0.95);
    border-top: 2px solid #1A1A1A;
}
</style>
