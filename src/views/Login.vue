<script lang="ts" setup>
import AuthLayout from '@/components/AuthLayout.vue';

const handleLogin = () => {
    console.log('Logging in...');
};
</script>

<template>
    <AuthLayout :is-register="false" title="Login">
        <template #fields>
            <div class="input-group">
                <label for="email">Email</label>
                <input id="email" type="email" placeholder="Enter your email" required />
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter your password" required />
            </div>

            <div class="forgot-password">
                <RouterLink to="/forgot-password" class="forgot-link">
                    Forgot password?
                </RouterLink>
            </div>
        </template>

        <template #actions>
            <button class="signin-button" @click="handleLogin">Sign in</button>

            <div class="divider">
                <span class="divider-text">or continue with</span>
            </div>

            <button class="google-button">
                <i class="ti ti-brand-google-filled"></i>
                Google
            </button>
        </template>
    </AuthLayout>
</template>
