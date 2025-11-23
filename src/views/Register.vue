<script lang="ts" setup>
import AuthLayout from '@/components/AuthLayout.vue';
</script>

<template>
    <AuthLayout :is-register="true" title="Join Us">
        <template #fields>
            <div class="input-group">
                <label for="fullName">Full Name</label>
                <input id="fullName" type="text" placeholder="Enter your full name" required />
            </div>

            <div class="input-group">
                <label for="email">Email</label>
                <input id="email" type="email" placeholder="Enter your email" required />
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Create a password" required />
            </div>

            <div class="input-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
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
