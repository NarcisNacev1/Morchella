<script lang="ts" setup>
import { nextTick, onMounted } from 'vue';
import { useLoginAnimations } from '@/stores/useLoginAnimations.ts';
import './../assets/login.css';
import { useAuthStore } from '@/stores/useAuthStore.ts';

interface Props {
    isRegister?: boolean;
    title?: string;
}

withDefaults(defineProps<Props>(), {
    isRegister: false,
    title: ''
});

const loginAnimations = useLoginAnimations();
const authStore = useAuthStore();

onMounted(async () => {
    await nextTick();
    loginAnimations.startAnimations();
});
</script>

<template>
    <div
        :ref="
            (el) => {
                if (el) loginAnimations.container = el as HTMLElement;
            }
        "
        class="login-container"
        @mousemove="loginAnimations.handleMouseMove"
    >
        <div
            v-for="(element, index) in loginAnimations.backgroundElements"
            :key="index"
            :ref="
                (el) => {
                    if (el) loginAnimations.elementRefs[index] = el as HTMLElement;
                }
            "
            class="floating-element"
            :style="{
                left: element.x + 'px',
                top: element.y + 'px',
                width: element.width + 'px',
            }"
        >
            <img :src="element.src" :alt="element.alt" :style="{ filter: element.filter }" />
        </div>

        <div class="glass-background">
            <div class="login-form">
                <div class="logo-container">
                    <img src="/favicon.ico" alt="Logo" class="logo" />
                </div>

                <h2 class="login-text">
                    {{ title }}
                </h2>

                <slot name="fields">
                    <template>
                        <div v-if="isRegister" class="input-group">
                            <label for="fullName">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                v-model="authStore.form.fullName"
                                required
                            />
                        </div>

                        <div class="input-group">
                            <label for="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                v-model="authStore.form.email"
                                required
                            />
                        </div>

                        <div class="input-group">
                            <label for="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                :placeholder="
                                    isRegister ? 'Create a password' : 'Enter your password'
                                "
                                v-model="authStore.form.password"
                                required
                            />
                        </div>

                        <div v-if="isRegister" class="input-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                v-model="authStore.form.confirmPassword"
                                required
                            />
                        </div>
                    </template>
                </slot>

                <slot name="actions">
                    <button
                        class="signin-button"
                        @click="isRegister ? authStore.handleRegister() : authStore.handleLogin()"
                        :disabled="authStore.isLoading"
                    >
                        <span v-if="authStore.isLoading">
                            {{ isRegister ? 'Creating Account...' : 'Signing in...' }}
                        </span>
                        <span v-else>
                            {{ isRegister ? 'Create Account' : 'Sign in' }}
                        </span>
                    </button>

                    <div v-if="!isRegister" class="divider">
                        <span class="divider-text">or continue with</span>
                    </div>

                    <button
                        class="google-button"
                        @click="authStore.handleGoogleLogin()"
                        :disabled="authStore.isLoading"
                    >
                        <i class="ti ti-brand-google-filled"></i>
                        Google
                    </button>
                </slot>

                <slot name="footer">
                    <div class="register-container">
                        <span class="register-text">
                            {{
                                isRegister ? 'Already have an account? ' : "Don't have an account? "
                            }}
                        </span>
                        <RouterLink :to="isRegister ? '/login' : '/register'" class="register-link">
                            {{ isRegister ? 'Sign in' : 'Register now' }}
                        </RouterLink>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.signin-button:disabled,
.google-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.signin-button:disabled {
    position: relative;
    color: transparent;
}

.signin-button:disabled span:not(.loading-text) {
    visibility: hidden;
}

.loading-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: inherit;
}
</style>
