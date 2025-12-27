import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import { useErrorHandler } from '@/composables/useErrorHandler';
import { computed, ref } from 'vue';

export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
    season?: string;
    weight?: number;
    flavorProfile?: string;
    bestUses?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const useProductsStore = defineStore('products', () => {
    const errorHandler = useErrorHandler();

    const products = ref<Product[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const getAllProducts = computed(() => products.value);

    const setLoading = (loading: boolean) => {
        isLoading.value = loading;
    };

    const setError = (message: string | null) => {
        error.value = message;
    };

    const clearError = () => {
        error.value = null;
    };

    const fetchAllProducts = async () => {
        return await errorHandler.handleOperation(
            async () => {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsList: Product[] = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    productsList.push({
                        id: doc.id,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category,
                        imageUrl: data.imageUrl,
                        stock: data.stock,
                        season: data.season,
                        weight: data.weight,
                        flavorProfile: data.flavorProfile,
                        bestUses: data.bestUses,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt
                    });
                });

                products.value = productsList;
                return productsList;
            },
            {
                loadingCallback: setLoading,
                errorCallback: setError,
                showToast: false
            }
        );
    };

    return {
        products,
        isLoading,
        error,
        getAllProducts,
        fetchAllProducts,
        clearError,
        setError
    };
});
