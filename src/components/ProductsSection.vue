<script lang="ts" setup>
import { useHomePageStore } from '@/stores/useHomePageStore.ts';
import { useProductsStore } from '@/stores/useProductsStore.ts';
import { onMounted, ref } from 'vue';

const homePageStore = useHomePageStore();
const productsStore = useProductsStore();

const showAddForm = ref(false);

onMounted(() => {
    productsStore.fetchAllProducts();
});

const handleSubmit = async () => {
    const result = await productsStore.createProduct(productsStore.newProduct);
    if (result.success) {
        productsStore.resetNewProduct();
        showAddForm.value = false;
    }
};
</script>

<template>
    <div class="section-3-content">
        <h2>Our Mushroom Collection</h2>
        <p>Wild-harvested, premium quality mushrooms</p>

        <!-- Add Product Button -->
        <div class="add-product-section">
            <button @click="showAddForm = !showAddForm" class="toggle-form-btn">
                {{ showAddForm ? 'Cancel' : '+ Add New Mushroom' }}
            </button>
        </div>

        <!-- Add Product Form -->
        <div v-if="showAddForm" class="add-product-form">
            <h3>Add New Mushroom</h3>
            <form @submit.prevent="handleSubmit">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="name">Mushroom Name *</label>
                        <input
                            id="name"
                            v-model="productsStore.newProduct.name"
                            type="text"
                            required
                            placeholder="e.g., MOREL"
                        />
                    </div>

                    <div class="form-group">
                        <label for="description">Description *</label>
                        <textarea
                            id="description"
                            v-model="productsStore.newProduct.description"
                            required
                            rows="3"
                            placeholder="Describe the mushroom..."
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <label for="price">Price ($) *</label>
                        <input
                            id="price"
                            v-model.number="productsStore.newProduct.price"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            placeholder="89.99"
                        />
                    </div>

                    <div class="form-group">
                        <label for="imageUrl">Image URL *</label>
                        <input
                            id="imageUrl"
                            v-model="productsStore.newProduct.imageUrl"
                            type="url"
                            required
                            placeholder="https://i.pinimg.com/1200x/..."
                        />
                        <small
                        >Use direct Pinterest image URL (right-click → Copy image
                            address)</small
                        >
                    </div>

                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" v-model="productsStore.newProduct.category">
                            <option value="wild-mushrooms">Wild Mushrooms</option>
                            <option value="cultivated">Cultivated</option>
                            <option value="medicinal">Medicinal</option>
                            <option value="rare">Rare</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="stock">Stock Quantity *</label>
                        <input
                            id="stock"
                            v-model.number="productsStore.newProduct.stock"
                            type="number"
                            min="0"
                            required
                            placeholder="15"
                        />
                    </div>

                    <div class="form-group">
                        <label for="season">Season</label>
                        <select id="season" v-model="productsStore.newProduct.season">
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Year-round">Year-round</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="weight">Weight (grams)</label>
                        <input
                            id="weight"
                            v-model.number="productsStore.newProduct.weight"
                            type="number"
                            min="0"
                            placeholder="50"
                        />
                    </div>

                    <div class="form-group">
                        <label for="flavorProfile">Flavor Profile</label>
                        <input
                            id="flavorProfile"
                            v-model="productsStore.newProduct.flavorProfile"
                            type="text"
                            placeholder="Nutty, earthy, meaty"
                        />
                    </div>

                    <div class="form-group full-width">
                        <label for="bestUses">Best Uses</label>
                        <input
                            id="bestUses"
                            v-model="productsStore.newProduct.bestUses"
                            type="text"
                            placeholder='"Sautéed", "Cream sauces", "With meats"'
                        />
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" @click="showAddForm = false" class="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" :disabled="productsStore.isCreating" class="submit-btn">
                        {{ productsStore.isCreating ? 'Creating...' : 'Add Mushroom' }}
                    </button>
                </div>
            </form>
        </div>

        <!-- Loading State -->
        <div v-if="productsStore.isLoading" class="loading">
            <div class="spinner"></div>
            <p>Harvesting mushrooms...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="productsStore.error" class="error">
            <p>{{ productsStore.error }}</p>
            <button @click="productsStore.fetchAllProducts()" class="retry-btn">Try Again</button>
        </div>

        <!-- Products Grid -->
        <div v-else-if="productsStore.products.length > 0" class="products-grid">
            <div v-for="product in productsStore.products" :key="product.id" class="product-card">
                <div class="product-image">
                    <img :src="product.imageUrl" :alt="product.name" />
                    <div v-if="product.season" class="season-badge">{{ product.season }}</div>
                </div>

                <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <p class="category">{{ product.category }}</p>

                    <p class="description">{{ product.description }}</p>

                    <!-- Debug: Show image URL -->
                    <div class="debug-url">
                        <small>Image URL: {{ product.imageUrl }}</small>
                    </div>

                    <!-- Flavor Profile -->
                    <div v-if="product.flavorProfile" class="flavor-profile">
                        <span class="flavor-label">Flavor:</span>
                        <span class="flavor-value">{{ product.flavorProfile }}</span>
                    </div>

                    <!-- Best Uses -->
                    <div v-if="product.bestUses" class="best-uses">
                        <span class="uses-label">Best for:</span>
                        <div class="uses-content">{{ product.bestUses }}</div>
                    </div>

                    <!-- Product Details -->
                    <div class="product-details">
                        <div class="detail-group">
                            <div v-if="product.weight" class="detail-item">
                                <span class="detail-label">Weight:</span>
                                <span class="detail-value">{{ product.weight }}g</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Stock:</span>
                                <span
                                    class="detail-value"
                                    :class="{ 'low-stock': product.stock < 10 }"
                                >
                                    {{ product.stock }} available
                                </span>
                            </div>
                        </div>

                        <div class="price-section">
                            <span class="price">${{ product.price.toFixed(2) }}</span>
                        </div>
                    </div>

                    <button
                        class="add-to-cart-btn"
                        :disabled="product.stock === 0"
                        :class="{ disabled: product.stock === 0 }"
                    >
                        {{ product.stock > 0 ? 'Add to Basket' : 'Out of Stock' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
            <svg class="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            <h3>No Mushrooms Available</h3>
            <p>Add your first mushroom using the form above!</p>
        </div>

        <!-- Back to Top -->
        <div class="back-to-top" @click="homePageStore.scrollToSection1">
            <span>Back to Top</span>
            <svg class="arrow-icon up" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 19V5M12 5L5 12M12 5L19 12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    </div>
</template>

<style scoped>
/* Your existing styles remain here */

/* Add Product Section */
.add-product-section {
    margin: 2rem 0;
    text-align: center;
}

.toggle-form-btn {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.toggle-form-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.4);
}

/* Add Product Form */
.add-product-form {
    background: rgba(245, 233, 221, 0.05);
    border: 1px solid rgba(245, 233, 221, 0.1);
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem 0;
}

.add-product-form h3 {
    color: #f5e9dd;
    margin-bottom: 1.5rem;
    text-align: center;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

.form-group label {
    color: rgba(245, 233, 221, 0.8);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    background: rgba(245, 233, 221, 0.1);
    border: 1px solid rgba(245, 233, 221, 0.2);
    border-radius: 6px;
    padding: 0.75rem;
    color: #f5e9dd;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-group small {
    color: rgba(245, 233, 221, 0.5);
    font-size: 0.8rem;
    margin-top: 0.25rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(245, 233, 221, 0.1);
}

.cancel-btn {
    background: rgba(245, 233, 221, 0.1);
    color: rgba(245, 233, 221, 0.8);
    border: 1px solid rgba(245, 233, 221, 0.2);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cancel-btn:hover {
    background: rgba(245, 233, 221, 0.2);
}

.submit-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
}

.submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Debug URL */
.debug-url {
    background: rgba(245, 233, 221, 0.05);
    padding: 0.5rem;
    border-radius: 4px;
    margin: 0.5rem 0;
    font-size: 0.8rem;
    color: rgba(245, 233, 221, 0.6);
    word-break: break-all;
}
</style>
