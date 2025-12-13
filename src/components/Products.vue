<script setup lang="ts">
import ProductBox from '@/components/ProductBox.vue';
import { onMounted } from 'vue';
import { useProductsStore } from '@/stores/useProductsStore.ts';

const productsStore = useProductsStore();

onMounted(() => {
    productsStore.fetchAllProducts();
});
</script>

<template>
    <div class="section-3-content">
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
                    :has-right-border="index < 4"
                    :has-left-border="index === 0"
                    :has-top-border="index < 4"
                    :has-bottom-border="true"
                />
            </div>

            <div class="grid-row">
                <ProductBox
                    v-if="productsStore.products[4]"
                    :key="productsStore.products[4].id"
                    :image-url="productsStore.products[4].imageUrl"
                    :title="productsStore.products[4].name"
                    :has-right-border="true"
                    :has-left-border="true"
                    :has-bottom-border="true"
                />

                <div class="empty-box"></div>

                <ProductBox
                    v-if="productsStore.products[5]"
                    :key="productsStore.products[5].id"
                    :image-url="productsStore.products[5].imageUrl"
                    :title="productsStore.products[5].name"
                    :has-right-border="true"
                    :has-bottom-border="true"
                />

                <ProductBox
                    v-if="productsStore.products[6]"
                    :key="productsStore.products[6].id"
                    :image-url="productsStore.products[6].imageUrl"
                    :title="productsStore.products[6].name"
                    :has-right-border="true"
                    :has-bottom-border="true"
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
    max-width: 1304px;
    text-align: center;
    padding: 2rem 8rem 4rem 2rem;
    background: transparent;
}

h2 {
    font-size: 2.5rem;
    color: #1A1A1A;
    margin-bottom: 0.75rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.section-3-content > p {
    color: #666;
    margin-bottom: 3rem;
    font-size: 1.125rem;
    font-weight: 400;
    letter-spacing: 0.3px;
}

.products-grid {
    background: transparent;
    min-width: 1104px;
    overflow: hidden;
    border: none;
}

.grid-row {
    display: flex;
    background: transparent;
}

.loading {
    text-align: center;
    padding: 4rem;
    background: transparent;
}

.spinner {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(245, 233, 221, 0.3);
    border-top-color: #C5BCB0;
    border-radius: 50%;
    animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    margin: 0 auto 1.5rem;
    position: relative;
}

.spinner:before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 3px solid transparent;
    border-top-color: #F5E9DD;
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading p {
    color: #666;
    font-size: 1.1rem;
    font-weight: 500;
}

.error {
    text-align: center;
    padding: 3rem;
    background: linear-gradient(135deg, rgba(255, 245, 245, 0.9) 0%, rgba(254, 202, 202, 0.1) 100%);
    border-radius: 16px;
    margin: 2rem 0;
    border: 1px solid #fecaca;
}

.error p {
    color: #dc2626;
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
    font-weight: 500;
}

.retry-btn {
    background: linear-gradient(135deg, #C5BCB0 0%, #F5E9DD 100%);
    color: #1A1A1A;
    padding: 0.875rem 2.25rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
    font-size: 1rem;
    box-shadow: 0 4px 15px rgba(197, 188, 176, 0.3);
    border: 1px solid rgba(26, 26, 26, 0.1);
}

.retry-btn:hover {
    background: linear-gradient(135deg, #B1A899 0%, #E8D9C9 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(197, 188, 176, 0.4);
    color: #000;
}

.retry-btn:active {
    transform: translateY(0);
}

.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, rgba(197, 188, 176, 0.1) 0%, rgba(245, 233, 221, 0.05) 100%);
    border-radius: 16px;
    margin: 2rem 0;
    border: 1px solid rgba(197, 188, 176, 0.3);
}

.empty-state h3 {
    color: #C5BCB0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.empty-state p {
    color: #B1A899;
    font-size: 1.125rem;
}

.empty-box {
    width: 320px;
    height: 300px;
    background: transparent;
    border-right: 2px solid #1A1A1A;
    position: relative;
}

@media (max-width: 1200px) {
    .empty-box {
        width: 300px;
        height: 300px;
    }
}

@media (max-width: 1000px) {
    .empty-box {
        width: 250px;
        height: 250px;
    }
}

@media (max-width: 800px) {
    .empty-box {
        width: 200px;
        height: 200px;
    }
}

@media (max-width: 600px) {
    .empty-box {
        width: 175px;
        height: 175px;
    }
}

@media (max-width: 1404px) {
    .section-3-content {
        max-width: calc(100% - 2rem);
        padding: 1.5rem;
    }

    .products-grid {
        width: 100%;
        margin: 0 auto;
    }

    h2 {
        font-size: 2.25rem;
    }
}

@media (max-width: 1200px) {
    .section-3-content {
        padding: 1.25rem;
    }

    h2 {
        font-size: 2rem;
    }

    .section-3-content > p {
        font-size: 1rem;
    }
}

@media (max-width: 1000px) {
    .section-3-content {
        padding: 1rem;
    }

    .grid-row {
        flex-wrap: wrap;
    }
}

@media (max-width: 800px) {
    h2 {
        font-size: 1.75rem;
    }

    .section-3-content > p {
        margin-bottom: 2rem;
        font-size: 0.95rem;
    }

    .products-grid {
        border-width: 1px;
        border-radius: 12px;
    }
}

@media (max-width: 600px) {
    .section-3-content {
        padding: 1rem 0.5rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    .loading, .error, .empty-state {
        padding: 2rem 1rem;
    }

    .spinner {
        width: 50px;
        height: 50px;
    }
}
</style>
