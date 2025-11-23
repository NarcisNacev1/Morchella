<script lang="ts" setup>
import AuthLayout from '@/components/AuthLayout.vue';
import { useAuthStore } from '@/stores/useAuthStore.ts';

const authStore = useAuthStore();
</script>

<template>
    <AuthLayout :is-register="false" title="Login">
        <template #fields>
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
                    placeholder="Enter your password"
                    v-model="authStore.form.password"
                    required
                />
            </div>

            <div class="forgot-password">
                <RouterLink to="/forgot-password" class="forgot-link">
                    Forgot password?
                </RouterLink>
            </div>
        </template>
    </AuthLayout>
</template>
