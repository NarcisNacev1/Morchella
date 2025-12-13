import { useToastStore } from '@/stores/useToastsStore.ts';

interface OperationResult<T = any> {
    success: boolean;
    error?: string;
    data?: T;
}

interface ValidationResult {
    valid: boolean;
    message?: string;
}

interface ErrorHandlerConfig {
    showToast?: boolean;
    toastType?: 'success' | 'error' | 'warning' | 'info';
    toastSuccessMessage?: string;
    toastErrorMessage?: string;
    loadingCallback?: (loading: boolean) => void;
    errorCallback?: (error: string | null) => void;
}

export const useErrorHandler = () => {
    const toastStore = useToastStore();

    const getGenericErrorMessage = (error: any): string => {
        if (error?.code?.startsWith('auth/')) {
            return getAuthErrorMessage(error.code);
        }

        if (error?.code?.startsWith('firestore/')) {
            return getFirestoreErrorMessage(error.code);
        }

        if (error?.code?.startsWith('storage/')) {
            return getStorageErrorMessage(error.code);
        }

        if (error?.response?.status) {
            return getHttpErrorMessage(error.response.status);
        }

        if (error?.message?.includes('network') || error?.message?.includes('Network')) {
            return 'Network error. Please check your connection.';
        }

        if (error?.message?.includes('permission') || error?.message?.includes('denied')) {
            return 'You do not have permission to perform this action.';
        }

        return error?.message || 'An unexpected error occurred. Please try again.';
    };

    const getAuthErrorMessage = (errorCode: string): string => {
        switch (errorCode) {
        case 'auth/invalid-email':
            return 'Invalid email address.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your connection.';
        case 'auth/too-many-requests':
            return 'Too many attempts. Please try again later.';
        case 'auth/popup-closed-by-user':
            return 'Sign in was cancelled.';
        case 'auth/operation-not-allowed':
            return 'This operation is not allowed.';
        case 'auth/invalid-credential':
            return 'Invalid email or password.';
        default:
            return 'An authentication error occurred.';
        }
    };

    const getFirestoreErrorMessage = (errorCode: string): string => {
        switch (errorCode) {
        case 'firestore/permission-denied':
            return 'You do not have permission to access this data.';
        case 'firestore/not-found':
            return 'Document not found.';
        case 'firestore/already-exists':
            return 'Document already exists.';
        case 'firestore/resource-exhausted':
            return 'Quota exceeded. Please try again later.';
        case 'firestore/failed-precondition':
            return 'Operation failed due to a precondition.';
        case 'firestore/aborted':
            return 'Operation was aborted.';
        case 'firestore/unavailable':
            return 'Service is temporarily unavailable.';
        default:
            return 'A database error occurred.';
        }
    };

    const getStorageErrorMessage = (errorCode: string): string => {
        switch (errorCode) {
        case 'storage/unauthorized':
            return 'You are not authorized to perform this operation.';
        case 'storage/canceled':
            return 'Operation was canceled.';
        case 'storage/unknown':
            return 'An unknown error occurred.';
        case 'storage/invalid-argument':
            return 'Invalid argument provided.';
        case 'storage/not-found':
            return 'File not found.';
        case 'storage/quota-exceeded':
            return 'Storage quota exceeded.';
        default:
            return 'A storage error occurred.';
        }
    };

    const getHttpErrorMessage = (statusCode: number): string => {
        switch (statusCode) {
        case 400:
            return 'Bad request. Please check your input.';
        case 401:
            return 'Unauthorized. Please log in.';
        case 403:
            return 'Forbidden. You do not have permission.';
        case 404:
            return 'Resource not found.';
        case 409:
            return 'Conflict. Resource already exists.';
        case 422:
            return 'Validation error. Please check your input.';
        case 429:
            return 'Too many requests. Please try again later.';
        case 500:
            return 'Internal server error. Please try again later.';
        case 503:
            return 'Service unavailable. Please try again later.';
        default:
            return `HTTP error ${statusCode}`;
        }
    };

    const handleOperation = async <T>(
        operation: () => Promise<T>,
        config: ErrorHandlerConfig = {}
    ): Promise<OperationResult<T>> => {
        const {
            showToast = false,
            toastType = 'error',
            toastSuccessMessage,
            toastErrorMessage,
            loadingCallback,
            errorCallback
        } = config;

        try {
            loadingCallback?.(true);
            errorCallback?.(null);

            const result = await operation();

            if (showToast && toastSuccessMessage) {
                toastStore.success(toastSuccessMessage);
            }

            return {
                success: true,
                data: result
            };
        } catch (err: any) {
            const errorMessage = getGenericErrorMessage(err);

            errorCallback?.(errorMessage);

            if (showToast) {
                const message = toastErrorMessage || errorMessage;
                toastStore.error(message);
            }

            return {
                success: false,
                error: errorMessage
            };
        } finally {
            loadingCallback?.(false);
        }
    };

    const showToast = (
        message: string,
        type: 'success' | 'error' | 'warning' | 'info' = 'error'
    ) => {
        toastStore.show({ message, type });
    };

    const validateEmail = (email: string): ValidationResult => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            return { valid: false, message: 'Email is required' };
        }
        if (!emailRegex.test(email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }
        return { valid: true };
    };

    const validatePassword = (password: string): ValidationResult => {
        if (!password.trim()) {
            return { valid: false, message: 'Password is required' };
        }
        if (password.length < 6) {
            return { valid: false, message: 'Password must be at least 6 characters' };
        }
        return { valid: true };
    };

    const validateRequired = (fields: Record<string, any>): ValidationResult => {
        for (const [field, value] of Object.entries(fields)) {
            if (value === undefined || value === null || value === '') {
                return {
                    valid: false,
                    message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
                };
            }
        }
        return { valid: true };
    };

    const validateNumber = (
        value: any,
        fieldName: string,
        min?: number,
        max?: number
    ): ValidationResult => {
        if (value === undefined || value === null || value === '') {
            return { valid: false, message: `${fieldName} is required` };
        }

        const num = Number(value);
        if (isNaN(num)) {
            return { valid: false, message: `${fieldName} must be a number` };
        }

        if (min !== undefined && num < min) {
            return { valid: false, message: `${fieldName} must be at least ${min}` };
        }

        if (max !== undefined && num > max) {
            return { valid: false, message: `${fieldName} must be at most ${max}` };
        }

        return { valid: true };
    };

    const validateStringLength = (
        value: string,
        fieldName: string,
        min?: number,
        max?: number
    ): ValidationResult => {
        if (!value.trim()) {
            return { valid: false, message: `${fieldName} is required` };
        }

        if (min !== undefined && value.length < min) {
            return { valid: false, message: `${fieldName} must be at least ${min} characters` };
        }

        if (max !== undefined && value.length > max) {
            return { valid: false, message: `${fieldName} must be at most ${max} characters` };
        }

        return { valid: true };
    };

    const validateUrl = (url: string, fieldName: string = 'URL'): ValidationResult => {
        if (!url.trim()) {
            return { valid: false, message: `${fieldName} is required` };
        }

        try {
            new URL(url);
            return { valid: true };
        } catch {
            return { valid: false, message: `Please enter a valid ${fieldName.toLowerCase()}` };
        }
    };

    const validateRegistration = (formData: {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }): ValidationResult => {
        const requiredValidation = validateRequired({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        });
        if (!requiredValidation.valid) return requiredValidation;

        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.valid) return emailValidation;

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.valid) return passwordValidation;

        if (formData.password !== formData.confirmPassword) {
            return { valid: false, message: 'Passwords do not match' };
        }

        return { valid: true };
    };

    const validateLogin = (formData: { email: string; password: string }): ValidationResult => {
        const requiredValidation = validateRequired(formData);
        if (!requiredValidation.valid) return requiredValidation;

        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.valid) return emailValidation;

        return { valid: true };
    };

    const validateResetPassword = (email: string): ValidationResult => {
        return validateEmail(email);
    };

    const validateProduct = (productData: {
        name: string;
        description: string;
        price: number;
        category: string;
        stock: number;
    }): ValidationResult => {
        const requiredValidation = validateRequired(productData);
        if (!requiredValidation.valid) return requiredValidation;

        const nameValidation = validateStringLength(productData.name, 'Product name', 2, 100);
        if (!nameValidation.valid) return nameValidation;

        const descValidation = validateStringLength(
            productData.description,
            'Description',
            10,
            1000
        );
        if (!descValidation.valid) return descValidation;

        const priceValidation = validateNumber(productData.price, 'Price', 0.01, 1000000);
        if (!priceValidation.valid) return priceValidation;

        const stockValidation = validateNumber(productData.stock, 'Stock', 0, 1000000);
        if (!stockValidation.valid) return stockValidation;

        return { valid: true };
    };

    return {
        getGenericErrorMessage,
        getAuthErrorMessage,
        getFirestoreErrorMessage,
        getStorageErrorMessage,
        getHttpErrorMessage,
        handleOperation,
        showToast,
        validateEmail,
        validatePassword,
        validateRequired,
        validateNumber,
        validateStringLength,
        validateUrl,
        validateForm: validateRequired,
        validateRegistration,
        validateLogin,
        validateResetPassword,
        validateProduct
    };
};
