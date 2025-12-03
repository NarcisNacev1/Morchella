import { defineStore } from 'pinia';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
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
    const isCreating = ref(false);
    const error = ref<string | null>(null);

    // New product form
    const newProduct = ref<Partial<Product>>({
        name: '',
        description: '',
        price: 0,
        category: 'wild-mushrooms',
        imageUrl: '',
        stock: 0,
        season: 'Spring',
        weight: 50,
        flavorProfile: '',
        bestUses: ''
    });

    const getAllProducts = computed(() => products.value);

    const setLoading = (loading: boolean) => {
        isLoading.value = loading;
    };

    const setCreating = (creating: boolean) => {
        isCreating.value = creating;
    };

    const setError = (message: string | null) => {
        error.value = message;
    };

    const clearError = () => {
        error.value = null;
    };

    const resetNewProduct = () => {
        newProduct.value = {
            name: '',
            description: '',
            price: 0,
            category: 'wild-mushrooms',
            imageUrl: '',
            stock: 0,
            season: 'Spring',
            weight: 50,
            flavorProfile: '',
            bestUses: ''
        };
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

    const createProduct = async (productData: Partial<Product>) => {
        return await errorHandler.handleOperation(
            async () => {
                const productToCreate = {
                    name: productData.name || '',
                    description: productData.description || '',
                    price: Number(productData.price) || 0,
                    category: productData.category || 'wild-mushrooms',
                    imageUrl: productData.imageUrl || '',
                    stock: Number(productData.stock) || 0,
                    season: productData.season,
                    weight: Number(productData.weight) || 50,
                    flavorProfile: productData.flavorProfile,
                    bestUses: productData.bestUses,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                };

                const docRef = await addDoc(collection(db, 'products'), productToCreate);

                // Add to local state immediately
                const newProductWithId: Product = {
                    id: docRef.id,
                    ...productToCreate
                };
                products.value.unshift(newProductWithId);

                return newProductWithId;
            },
            {
                loadingCallback: setCreating,
                errorCallback: setError,
                showToast: true,
                toastSuccessMessage: 'Product created successfully!',
                toastErrorMessage: 'Failed to create product'
            }
        );
    };

    return {
        products,
        isLoading,
        isCreating,
        error,
        newProduct,
        getAllProducts,
        fetchAllProducts,
        createProduct,
        resetNewProduct,
        clearError,
        setError
    };
});
