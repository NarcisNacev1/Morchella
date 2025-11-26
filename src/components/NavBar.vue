<script setup lang="ts"></script>

<template>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="navbar-logo">
                <span class="logo-text">MORCHELLA</span>
            </div>

            <div class="navbar-center">
                <div class="nav-items">
                    <div class="nav-item dropdown-container">
                        <span class="nav-link">Products</span>
                        <i class="ti ti-chevron-down dropdown-icon"></i>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">Product 1</a>
                            <a href="#" class="dropdown-item">Product 2</a>
                            <a href="#" class="dropdown-item">Product 3</a>
                            <a href="#" class="dropdown-item">Product 4</a>
                        </div>
                    </div>

                    <a href="#" class="nav-item">
                        <span class="nav-link">About</span>
                    </a>

                    <a href="#" class="nav-item">
                        <span class="nav-link">Contacts</span>
                    </a>
                </div>
            </div>

            <div class="navbar-right">
                <button class="submit-request-btn">
                    <span class="btn-text">Submit request</span>
                    <i class="ti ti-mail mail-icon"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    padding: 0 2rem;
    height: 90px;
    display: flex;
    align-items: center;
    position: sticky;
    z-index: 1000;
}

.navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
}

.navbar-logo {
    flex: 1;
}

.logo-text {
    font-size: 1.8rem;
    font-weight: 700;
    text-decoration: none;
}

.navbar-center {
    flex: 2;
    display: flex;
    justify-content: center;
}

.nav-items {
    display: flex;
    gap: 3rem;
    align-items: center;
}

.nav-item {
    position: relative;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-link {
    font-size: 1.2rem;
    font-weight: 700;
    color: #333;
    padding: 0.5rem 0;
    transition: all 0.3s ease;
}

.nav-item:hover .nav-link {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
}

.dropdown-icon {
    font-size: 1.4rem;
    transition: transform 0.3s ease;
}

.dropdown-container:hover .dropdown-icon {
    transform: rotate(180deg);
}

.dropdown-container {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 0.5rem 0;
    min-width: 180px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.dropdown-container:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(5px);
}

.dropdown-item {
    display: block;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    color: #333;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
}

.dropdown-item:hover {
    background-color: #f8f9fa;
}

.navbar-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

.submit-request-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 2rem;
    background: transparent;
    border: 2px solid #8f867b;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
}

.submit-request-btn:hover {
    transform: translateY(-2px);
}

.mail-icon {
    font-size: 1.4rem;
}

.btn-text {
    white-space: nowrap;
}

@media (max-width: 768px) {
    .navbar {
        padding: 0 1rem;
    }

    .nav-items {
        gap: 1.5rem;
    }

    .logo-text {
        font-size: 1.25rem;
    }

    .submit-request-btn {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    }

    .dropdown-icon,
    .mail-icon {
        font-size: 1.2rem;
    }
}
</style>
