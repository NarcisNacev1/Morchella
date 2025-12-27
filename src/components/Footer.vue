<script setup lang="ts">
import { onMounted, ref } from 'vue';

const currentYear = new Date().getFullYear();
const footerRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const handleAboutClick = () => {
    console.log('About clicked');
};

const handleContactClick = () => {
    console.log('Contact clicked');
};

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    if (footerRef.value) {
        observer.observe(footerRef.value);
    }
});
</script>

<template>
    <footer ref="footerRef" class="footer-container" :class="{ visible: isVisible }">
        <div class="footer-content">
            <div class="top-table">
                <div class="table-row">
                    <button
                        class="table-cell left-cell"
                        @click="handleAboutClick"
                        aria-label="Go to About page"
                    >
                        <span class="button-text">About</span>
                        <svg
                            class="arrow-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        class="table-cell right-cell"
                        @click="handleContactClick"
                        aria-label="Go to Contact page"
                    >
                        <span class="button-text">Contact</span>
                        <svg
                            class="arrow-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="bottom-table">
                <div class="table-row">
                    <div class="table-cell">
                        <div class="cell-content">
                            <h3 class="company-name">Morchella</h3>
                        </div>
                    </div>

                    <div class="table-cell">
                        <div class="cell-content">
                            <p class="address">Skopje Statistical Region 1000</p>
                        </div>
                    </div>

                    <div class="table-cell">
                        <div class="cell-content">
                            <a
                                href="mailto:morchella@gmail.com"
                                class="email-link"
                                aria-label="Send email to morchella@gmail.com"
                            >
                                morchella@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="copyright">© {{ currentYear }} Morchella. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-container {
    width: 100%;
    min-height: 10vh;
    background: #1a1a1a;
    color: #f5e9dd;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
    opacity: 0;
    transform: translateY(50px);
    transition:
        opacity 0.8s ease-out,
        transform 0.8s ease-out;
}

.footer-container.visible {
    opacity: 1;
    transform: translateY(0);
}

.footer-content {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.top-table {
    width: 100%;
    border-bottom: 1px solid rgba(245, 233, 221, 0.2);
}

.table-row {
    display: flex;
    width: 100%;
}

.table-cell {
    flex: 1;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: inherit;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.left-cell {
    border-right: 1px solid rgba(245, 233, 221, 0.2);
}

.table-cell:hover {
    background: rgba(245, 233, 221, 0.1);
}

.table-cell:active {
    transform: scale(0.98);
}

.button-text {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 1px;
    margin-right: 0.5rem;
}

.arrow-icon {
    opacity: 0.7;
    transition: transform 0.3s ease;
}

.table-cell:hover .arrow-icon {
    transform: translateX(5px);
    opacity: 1;
}

.bottom-table {
    width: 100%;
    padding-top: 2rem;
}

.bottom-table .table-cell {
    padding: 1.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(245, 233, 221, 0.1);
    cursor: default;
}

.bottom-table .table-cell:hover {
    background: none;
}

.bottom-table .table-cell:last-child {
    border-right: none;
}

.cell-content {
    text-align: center;
}

.company-name {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 2px;
    margin: 0;
    color: #f5e9dd;
}

.address {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    opacity: 0.9;
    max-width: 200px;
}

.email-link {
    font-size: 1rem;
    color: #f5e9dd;
    text-decoration: none;
    opacity: 0.9;
    transition: all 0.3s ease;
    padding: 0.5rem;
    border-radius: 4px;
}

.email-link:hover {
    opacity: 1;
    background: rgba(245, 233, 221, 0.1);
}

.footer-bottom {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(245, 233, 221, 0.1);
    text-align: center;
}

.copyright {
    font-size: 0.9rem;
    opacity: 0.7;
    margin: 0;
}

/* Responsive design */
@media (max-width: 768px) {
    .footer-container {
        padding: 1.5rem;
    }

    .table-cell {
        padding: 1.5rem;
    }

    .button-text {
        font-size: 1.2rem;
    }

    .company-name {
        font-size: 1.5rem;
    }

    .address,
    .email-link {
        font-size: 0.9rem;
    }

    .table-row {
        flex-direction: column;
    }

    .left-cell {
        border-right: none;
        border-bottom: 1px solid rgba(245, 233, 221, 0.2);
    }

    .bottom-table .table-cell {
        border-right: none;
        border-bottom: 1px solid rgba(245, 233, 221, 0.1);
        padding: 1rem;
    }

    .bottom-table .table-cell:last-child {
        border-bottom: none;
    }
}

@media (max-width: 480px) {
    .footer-container {
        padding: 1rem;
    }

    .table-cell {
        padding: 1rem;
    }

    .button-text {
        font-size: 1rem;
    }

    .company-name {
        font-size: 1.3rem;
    }
}
</style>
