<script lang="ts" setup>
import AuthLayout from '@/components/AuthLayout.vue';

const handleSendResetLink = () => {
    console.log('Sending password reset link...');
};
</script>

<template>
    <AuthLayout title="Reset Password">
        <template #fields>
            <div class="input-group">
                <label for="email">Email</label>
                <input id="email" type="email" placeholder="Enter your email address" required />
            </div>
        </template>

        <template #actions>
            <button class="signin-button" @click="handleSendResetLink">Send Reset Link</button>
        </template>

        <template #footer>
            <div class="register-container">
                <span class="register-text">Remember your password?</span>
                <RouterLink to="/login" class="register-link"> Sign in</RouterLink>
            </div>
        </template>
    </AuthLayout>
</template>
