import { useToastStore } from '@/stores/useToastsStore.ts';

interface AuthOperationResult {
    success: boolean;
    error?: string;
    data?: any;
}

interface ValidationResult {
    valid: boolean;
    message?: string;
}

export const useAuthErrorHandler = () => {
    const toastStore = useToastStore();

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
            return 'An unexpected error occurred. Please try again.';
        }
    };

    const handleAuthOperation = async <T>(
        operation: () => Promise<T>,
        loadingCallback?: (loading: boolean) => void,
        errorCallback?: (error: string | null) => void
    ): Promise<AuthOperationResult> => {
        try {
            loadingCallback?.(true);
            errorCallback?.(null);

            const result = await operation();

            return {
                success: true,
                data: result
            };
        } catch (err: any) {
            const errorMessage = getAuthErrorMessage(err.code);
            errorCallback?.(errorMessage);

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

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): ValidationResult => {
        if (password.length < 6) {
            return { valid: false, message: 'Password must be at least 6 characters' };
        }
        return { valid: true };
    };

    const validateForm = (fields: Record<string, string>): ValidationResult => {
        for (const [field, value] of Object.entries(fields)) {
            if (!value.trim()) {
                return { valid: false, message: `${field} is required` };
            }
        }
        return { valid: true };
    };

    const validateRegistration = (formData: {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }): ValidationResult => {
        const requiredFields = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        };

        const requiredValidation = validateForm(requiredFields);
        if (!requiredValidation.valid) return requiredValidation;

        if (!validateEmail(formData.email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.valid) return passwordValidation;

        if (formData.password !== formData.confirmPassword) {
            return { valid: false, message: 'Passwords do not match' };
        }

        return { valid: true };
    };

    const validateLogin = (formData: { email: string; password: string }): ValidationResult => {
        const requiredValidation = validateForm(formData);
        if (!requiredValidation.valid) return requiredValidation;

        if (!validateEmail(formData.email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }

        return { valid: true };
    };

    const validateResetPassword = (email: string): ValidationResult => {
        if (!email.trim()) {
            return { valid: false, message: 'Email is required' };
        }

        if (!validateEmail(email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }

        return { valid: true };
    };

    return {
        getAuthErrorMessage,
        handleAuthOperation,
        showToast,
        validateEmail,
        validatePassword,
        validateForm,
        validateRegistration,
        validateLogin,
        validateResetPassword
    };
};
