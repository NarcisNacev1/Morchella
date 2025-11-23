<script lang="ts" setup>
import AuthLayout from '@/components/AuthLayout.vue';
import { useAuthStore } from '@/stores/useAuthStore.ts';

const authStore = useAuthStore();
</script>

<template>
    <AuthLayout title="Reset Password">
        <template #fields>
            <div class="input-group">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    v-model="authStore.form.email"
                    placeholder="Enter your email address"
                    required
                />
            </div>
        </template>

        <template #actions>
            <button class="signin-button" @click="authStore.handleResetPassword">
                Send Reset Link
            </button>
        </template>

        <template #footer>
            <div class="register-container">
                <span class="register-text">Remember your password?</span>
                <RouterLink to="/login" class="register-link"> Sign in</RouterLink>
            </div>
        </template>
    </AuthLayout>
</template>
