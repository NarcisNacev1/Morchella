<script lang="ts" setup>
import { nextTick, onMounted } from 'vue';
import { useLoginAnimations } from '@/stores/useLoginAnimations.ts';
import './../assets/login.css';

const loginAnimations = useLoginAnimations();

onMounted(async () => {
    await nextTick();
    loginAnimations.startAnimations();
});
</script>

<template>
    <div
        :ref="
            (el) => {
                if (el) loginAnimations.container = el as HTMLElement
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
                    if (el) loginAnimations.elementRefs[index] = el as HTMLElement
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

                <h2 class="login-text">Login</h2>

                <div class="input-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" placeholder="Enter your email" required />
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <div class="forgot-password">
                    <a href="#" class="forgot-link">Forgot password?</a>
                </div>

                <button class="signin-button">Sign in</button>

                <div class="divider">
                    <span class="divider-text">or continue with</span>
                </div>

                <button class="google-button">
                    <i class="ti ti-brand-google-filled"></i>
                    Google
                </button>

                <div class="register-container">
                    <span class="register-text">Don't have an account? </span>
                    <a href="#" class="register-link">Register now</a>
                </div>
            </div>
        </div>
    </div>
</template>
