<script lang="ts" setup>
import AuthLayout from '@/components/AuthLayout.vue';
import { useAuthStore } from '@/stores/useAuthStore.ts';

const authStore = useAuthStore();
</script>

<template>
    <AuthLayout :is-register="true" title="Join Us">
        <template #fields>
            <div class="input-group">
                <label for="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    v-model="authStore.form.fullName"
                    placeholder="Enter your full name"
                    required
                />
            </div>

            <div class="input-group">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    v-model="authStore.form.email"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input
                    id="password"
                    type="password"
                    v-model="authStore.form.password"
                    placeholder="Create a password"
                    required
                />
            </div>

            <div class="input-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    v-model="authStore.form.confirmPassword"
                    placeholder="Confirm your password"
                    required
                />
            </div>
        </template>

        <template #footer>
            <div class="register-container">
                <span class="register-text">Already have an account?</span>
                <a href="/login" class="register-link"> Sign in</a>
            </div>
        </template>
    </AuthLayout>
</template>
