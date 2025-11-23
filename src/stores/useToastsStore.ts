import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration: number;
}

export const useToastStore = defineStore('toast', () => {
    const toasts = ref<Toast[]>([]);
    let nextId = 0;

    const show = (options: { message: string; type?: Toast['type'] }, duration = 3000) => {
        const id = nextId++;
        const toast: Toast = {
            id,
            message: options.message,
            type: options.type || 'info',
            duration
        };

        toasts.value.push(toast);

        setTimeout(() => {
            remove(id);
        }, duration);
    };

    const success = (message: string, duration = 3000) => {
        show({ message, type: 'success' }, duration);
    };

    const error = (message: string, duration = 4000) => {
        show({ message, type: 'error' }, duration);
    };

    const info = (message: string, duration = 3000) => {
        show({ message, type: 'info' }, duration);
    };

    const warning = (message: string, duration = 3500) => {
        show({ message, type: 'warning' }, duration);
    };

    const remove = (id: number) => {
        const index = toasts.value.findIndex((t) => t.id === id);
        if (index > -1) {
            toasts.value.splice(index, 1);
        }
    };

    const clear = () => {
        toasts.value = [];
    };

    return {
        toasts,
        show,
        success,
        error,
        info,
        warning,
        remove,
        clear
    };
});
