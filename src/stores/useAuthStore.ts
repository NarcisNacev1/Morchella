import { defineStore } from 'pinia';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    type User
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { computed, ref } from 'vue';
import { db } from '@/firebase.ts';
import firebase from 'firebase/compat/app';
import router from '@/router';
import { useAuthErrorHandler } from '@/composables/useAuthErrorHandler';
import FieldValue = firebase.firestore.FieldValue;

interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    createdAt: FieldValue;
    lastLoginAt: FieldValue;
}

export const useAuthStore = defineStore('auth', () => {
    const errorHandler = useAuthErrorHandler();

    const user = ref<User | null>(null);
    const userData = ref<UserData | null>(null);
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    const form = ref<{
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const isAuthenticated = computed(() => !!user.value);
    const currentUser = computed(() => user.value);
    const currentUserData = computed(() => userData.value);

    const setLoading = (loading: boolean) => {
        isLoading.value = loading;
    };

    const setError = (message: string | null) => {
        error.value = message;
    };

    const clearError = () => {
        error.value = null;
    };

    const fetchUserData = async (uid: string) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                userData.value = userDoc.data() as UserData;
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    const setCookie = (name: string, value: string, days: number) => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict;Secure`;
    };

    const getCookie = (name: string): string | null => {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (const element of ca) {
            let c = element;
            while (c.startsWith(' ')) c = c.substring(1, c.length);
            if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    const removeCookie = (name: string) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict;Secure`;
    };

    const initAuth = () => {
        const auth = getAuth();

        return new Promise((resolve) => {
            onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    user.value = firebaseUser;
                    await fetchUserData(firebaseUser.uid);
                    setCookie('auth_token', await firebaseUser.getIdToken(), 7);
                } else {
                    user.value = null;
                    userData.value = null;
                    removeCookie('auth_token');
                }
                isLoading.value = false;
                resolve(true);
            });
        });
    };

    const register = async (email: string, password: string, fullName: string) => {
        return errorHandler.handleAuthOperation(
            async () => {
                const auth = getAuth();
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                await updateProfile(userCredential.user, {
                    displayName: fullName
                });

                const userDoc: UserData = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    displayName: fullName,
                    photoURL: null,
                    createdAt: serverTimestamp(),
                    lastLoginAt: serverTimestamp()
                };

                await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);

                user.value = userCredential.user;
                await fetchUserData(userCredential.user.uid);
                setCookie('auth_token', await userCredential.user.getIdToken(), 7);

                return userCredential;
            },
            setLoading,
            setError
        );
    };

    const login = async (email: string, password: string) => {
        return errorHandler.handleAuthOperation(
            async () => {
                const auth = getAuth();
                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                await setDoc(
                    doc(db, 'users', userCredential.user.uid),
                    { lastLoginAt: serverTimestamp() },
                    { merge: true }
                );

                await fetchUserData(userCredential.user.uid);
                setCookie('auth_token', await userCredential.user.getIdToken(), 7);

                return userCredential;
            },
            setLoading,
            setError
        );
    };

    const signInWithGoogle = async () => {
        return errorHandler.handleAuthOperation(
            async () => {
                const auth = getAuth();
                const provider = new GoogleAuthProvider();
                const userCredential = await signInWithPopup(auth, provider);

                const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

                if (userDoc.exists()) {
                    await setDoc(
                        doc(db, 'users', userCredential.user.uid),
                        { lastLoginAt: serverTimestamp() },
                        { merge: true }
                    );
                } else {
                    const newUserDoc: UserData = {
                        uid: userCredential.user.uid,
                        email: userCredential.user.email,
                        displayName: userCredential.user.displayName,
                        photoURL: userCredential.user.photoURL,
                        createdAt: serverTimestamp(),
                        lastLoginAt: serverTimestamp()
                    };
                    await setDoc(doc(db, 'users', userCredential.user.uid), newUserDoc);
                }

                await fetchUserData(userCredential.user.uid);
                setCookie('auth_token', await userCredential.user.getIdToken(), 7);

                return userCredential;
            },
            setLoading,
            setError
        );
    };

    const resetPassword = async (email: string) => {
        return errorHandler.handleAuthOperation(
            async () => {
                const auth = getAuth();
                await sendPasswordResetEmail(auth, email);
                return { message: 'Reset email sent' };
            },
            setLoading,
            setError
        );
    };

    const logout = async () => {
        return errorHandler.handleAuthOperation(
            async () => {
                const auth = getAuth();
                await signOut(auth);

                user.value = null;
                userData.value = null;
                removeCookie('auth_token');

                return { message: 'Logged out successfully' };
            },
            setLoading,
            setError
        );
    };

    const handleLogin = async () => {
        clearError();

        const validation = errorHandler.validateLogin({
            email: form.value.email,
            password: form.value.password
        });

        if (!validation.valid) {
            errorHandler.showToast(validation.message!);
            return;
        }

        const result = await login(form.value.email, form.value.password);

        if (result.success) {
            errorHandler.showToast('Welcome back! Login successful.', 'success');
            router.push('/dashboard');
        } else {
            errorHandler.showToast(result.error || 'Login failed. Please try again.');
        }
    };

    const handleGoogleLogin = async () => {
        clearError();

        const result = await signInWithGoogle();

        if (result.success) {
            errorHandler.showToast('Successfully signed in with Google!', 'success');
            router.push('/dashboard');
        } else {
            errorHandler.showToast(result.error || 'Google sign-in failed.');
        }
    };

    const handleRegister = async () => {
        clearError();

        const validation = errorHandler.validateRegistration(form.value);
        if (!validation.valid) {
            errorHandler.showToast(validation.message!);
            return;
        }

        const result = await register(form.value.email, form.value.password, form.value.fullName);

        if (result.success) {
            errorHandler.showToast('Account created successfully! Welcome!', 'success');
            router.push('/dashboard');
        } else {
            errorHandler.showToast(result.error || 'Registration failed. Please try again.');
        }
    };

    const handleResetPassword = async () => {
        clearError();

        const validation = errorHandler.validateResetPassword(form.value.email);
        if (!validation.valid) {
            errorHandler.showToast(validation.message!);
            return;
        }

        const result = await resetPassword(form.value.email);

        if (result.success) {
            errorHandler.showToast('Password reset link sent! Check your email.', 'success');
            form.value.email = '';
            setTimeout(() => router.push('/login'), 3000);
        } else {
            errorHandler.showToast(result.error || 'Failed to send reset link');
        }
    };

    return {
        user,
        userData,
        isLoading,
        error,
        isAuthenticated,
        currentUser,
        currentUserData,
        form,
        handleResetPassword,
        handleRegister,
        handleLogin,
        handleGoogleLogin,
        getCookie,
        initAuth,
        register,
        login,
        signInWithGoogle,
        resetPassword,
        logout,
        clearError,
        setError
    };
});
