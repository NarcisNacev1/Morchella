<script lang="ts" setup>
import { useProductsStore } from '@/stores/useProductsStore.ts';
import { onMounted } from 'vue';
import ProductBox from '../components/ProductBox.vue';

const productsStore = useProductsStore();

onMounted(() => {
    productsStore.fetchAllProducts();
});
</script>

<template>
    <div class="section-3-content">
        <h2>Our Mushroom Collection</h2>
        <p>Wild-harvested, premium quality mushrooms</p>

        <div v-if="productsStore.isLoading" class="loading">
            <div class="spinner"></div>
            <p>Harvesting mushrooms...</p>
        </div>

        <div v-else-if="productsStore.error" class="error">
            <p>{{ productsStore.error }}</p>
            <button @click="productsStore.fetchAllProducts()" class="retry-btn">Try Again</button>
        </div>

        <div v-else-if="productsStore.products.length > 0" class="products-grid">
            <div class="grid-row">
                <ProductBox
                    v-for="(product, index) in productsStore.products.slice(0, 4)"
                    :key="product.id"
                    :image-url="product.imageUrl"
                    :title="product.name"
                    :has-right-border="index < 3"
                    :has-bottom-border="true"
                />
            </div>

            <div class="grid-row">
                <ProductBox
                    v-for="(product, index) in productsStore.products.slice(4, 8)"
                    :key="product.id"
                    :image-url="product.imageUrl"
                    :title="product.name"
                    :has-right-border="index < 3"
                    :has-bottom-border="index !== 1"
                />
            </div>
        </div>

        <div v-else class="empty-state">
            <h3>No Mushrooms Available</h3>
            <p>Check back soon for our mushroom collection!</p>
        </div>
    </div>
</template>

<style scoped>
.section-3-content {
    padding: 2rem;
    max-width: 1404px;
    margin: 0 auto;
    text-align: center;
    background: transparent;
}

h2 {
    font-size: 2rem;
    color: #1A1A1A;
    margin-bottom: 0.5rem;
}

.section-3-content > p {
    color: #666;
    margin-bottom: 2rem;
    font-size: 1rem;
}

.products-grid {
    background: transparent;
    border: 2px solid #1A1A1A;
}

.grid-row {
    display: flex;
    background: transparent;
}

.grid-row:first-child {
    border-bottom: 2px solid #1A1A1A;
}

.loading {
    text-align: center;
    padding: 3rem;
    background: transparent;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f5e9dd;
    border-top-color: #1A1A1A;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.error {
    text-align: center;
    padding: 2rem;
    background: transparent;
    margin: 2rem 0;
}

.error p {
    color: #ef4444;
    margin-bottom: 1rem;
}

.retry-btn {
    background: #1A1A1A;
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.3s ease;
}

.retry-btn:hover {
    background: #000;
}

.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: transparent;
}

.empty-state h3 {
    color: #666;
    margin-bottom: 0.5rem;
}

.empty-state p {
    color: #999;
}

@media (max-width: 1404px) {
    .section-3-content {
        max-width: 100%;
        padding: 1rem;
    }

    .products-grid {
        transform: scale(0.9);
        transform-origin: center;
    }
}

@media (max-width: 1200px) {
    .products-grid {
        transform: scale(0.8);
        transform-origin: center;
    }
}

@media (max-width: 1000px) {
    .products-grid {
        transform: scale(0.7);
        transform-origin: center;
    }
}

@media (max-width: 800px) {
    .products-grid {
        transform: scale(0.6);
        transform-origin: center;
    }
}

@media (max-width: 600px) {
    .section-3-content {
        max-width: 100%;
        padding: 0.5rem;
    }

    .products-grid {
        transform: scale(0.5);
        transform-origin: center;
    }
}
</style>
