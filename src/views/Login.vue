<template>
    <div class="login-container">
        <div class="glass-background">
            <div class="login-form">
                <div class="logo-container">
                    <img src="/logo.png" alt="Logo" class="logo" />
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

                <button class="google-button">Continue with Google</button>

                <div class="register-container">
                    <span class="register-text">Don't have an account? </span>
                    <a href="#" class="register-link">Register now</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    height: 100vh;
    width: 100%;
    background: url('/login/loginBG.png') center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
}

.glass-background {
    background: radial-gradient(
        circle at center,
        rgba(255, 132, 0, 0.3) 0%,
        rgba(101, 74, 0, 0.3) 100%
    );
    backdrop-filter: blur(2px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 40px;
    width: 85.375rem;
    height: 48rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    overflow: hidden;
}

.glass-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
}

.glass-background:hover::before {
    left: 100%;
}

.glass-background:hover {
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow:
        0 15px 45px rgba(255, 132, 0, 0.2),
        0 0 60px rgba(255, 132, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(-5px) scale(1.02);
}

.login-form {
    background: radial-gradient(
        circle at center,
        rgba(255, 132, 0, 0.3) 0%,
        rgba(101, 74, 0, 0.3) 100%
    );
    backdrop-filter: blur(2px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1.875rem;
    width: 25.625rem;
    height: auto;
    min-height: 34.854rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 0.625rem;
}

.logo {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
}

.login-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    text-align: left;
    margin: 0;
    margin-bottom: 0.625rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0.5rem;
}

.input-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
}

.input-group input {
    padding: 0.75rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.875rem;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
}

.input-group input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.input-group input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
}

.forgot-password {
    text-align: left;
    margin-top: -0.5rem;
}

.forgot-link {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
}

.forgot-link:hover {
    color: white;
    text-decoration: underline;
}

.signin-button {
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    margin-top: 0.5rem;
}

.signin-button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
}

.divider {
    position: relative;
    text-align: center;
    margin: 1rem 0;
}

.divider-text {
    padding: 0 1rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
}

.google-button {
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0.5rem;
    color: white;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.google-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}

.google-icon {
    width: 1.125rem;
    height: 1.125rem;
}

.register-container {
    text-align: center;
    margin-top: 1rem;
}

.register-text {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
}

.register-link {
    font-size: 0.875rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.register-link:hover {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: underline;
}

.login-form::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transform: scale(0);
    transition: transform 0.6s ease;
}

.login-form:hover::before {
    transform: scale(1);
}

.login-form:hover {
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.3),
        0 0 80px rgba(255, 132, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transform: translateY(-8px) scale(1.05);
    background: radial-gradient(
        circle at center,
        rgba(255, 132, 0, 0.4) 0%,
        rgba(101, 74, 0, 0.4) 100%
    );
}

@keyframes pulse-glow {
    0%,
    100% {
        box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.3),
            0 0 80px rgba(255, 132, 0, 0.3);
    }
    50% {
        box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.3),
            0 0 100px rgba(255, 132, 0, 0.5);
    }
}

.login-form:hover {
    animation: pulse-glow 2s ease-in-out infinite;
}

.glass-background:focus-within,
.login-form:focus-within {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 4px;
}
</style>
