import { defineStore } from 'pinia';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { onUnmounted, ref } from 'vue';

export const useModelStore = defineStore('modelStore', () => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    const modelContainer = ref<HTMLElement>();

    const loadedModels: Map<string, THREE.Group> = new Map();
    let currentModelPath: string | null = null;

    const modelPaths = [
        '/models/morel/scene.gltf',
        '/models/chanterelle/scene.gltf',
        '/models/porcini/scene.gltf',
        '/models/amanita/scene.gltf'
    ];

    const initScene = (container: HTMLElement | undefined) => {
        if (!container) {
            return;
        }
        modelContainer.value = container;
        scene = new THREE.Scene();
        scene.background = null;

        camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 2.2);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7);
        scene.add(directionalLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(-5, -5, -5);
        scene.add(backLight);
    };

    const centerModelMethod1 = (model: THREE.Group) => {
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const offset = center.clone().multiplyScalar(-1);

        model.position.copy(offset);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.5;
        const scale = targetSize / maxDim;
        model.scale.set(scale, scale, scale);

        return model;
    };

    const centerModelMethod2 = (model: THREE.Group) => {
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const wrapper = new THREE.Group();

        wrapper.add(model);

        model.position.set(-center.x, -center.y, -center.z);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.5;
        const scale = targetSize / maxDim;
        wrapper.scale.set(scale, scale, scale);

        return wrapper;
    };

    const preloadAllModels = () => {
        const loader = new GLTFLoader();

        modelPaths.forEach((path) => {
            loader.load(
                path,
                (gltf) => {
                    let model = gltf.scene;

                    model.traverse((child) => {
                        if (
                            child instanceof THREE.Line ||
                            child instanceof THREE.BoxHelper ||
                            child.name.toLowerCase().includes('box') ||
                            child.name.toLowerCase().includes('bounding') ||
                            child.name.toLowerCase().includes('wireframe')
                        ) {
                            child.visible = false;
                        }
                    });

                    model.rotation.set(0, 0, 0);
                    model.scale.set(1, 1, 1);
                    model.position.set(0, 0, 0);

                    if (
                        path.includes('chanterelle') ||
                        path.includes('porcini') ||
                        path.includes('amanita')
                    ) {
                        model = centerModelMethod2(model);
                    } else {
                        model = centerModelMethod1(model);
                    }

                    model.visible = false;

                    loadedModels.set(path, model);

                    scene.add(model);
                },
                undefined,
                (error) => {
                    console.error(`Error preloading model from ${path}:`, error);
                }
            );
        });
    };

    const switchToModel = (path: string) => {
        if (currentModelPath && loadedModels.has(currentModelPath)) {
            const currentModel = loadedModels.get(currentModelPath);
            if (currentModel) {
                currentModel.visible = false;
            }
        }

        if (loadedModels.has(path)) {
            const newModel = loadedModels.get(path);
            if (newModel) {
                newModel.visible = true;
                currentModelPath = path;
            }
        } else {
            console.warn(`Model ${path} not yet loaded`);
        }
    };

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (currentModelPath && loadedModels.has(currentModelPath)) {
            const currentModel = loadedModels.get(currentModelPath);
            if (currentModel && currentModel.visible) {
                currentModel.rotation.y += 0.01;
            }
        }

        renderer.render(scene, camera);
    };

    const handleResize = () => {
        if (!modelContainer.value || !camera || !renderer) return;

        camera.aspect = modelContainer.value.clientWidth / modelContainer.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(modelContainer.value.clientWidth, modelContainer.value.clientHeight);
    };

    onUnmounted(() => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);

        loadedModels.forEach((model) => {
            model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    if (Array.isArray(child.material)) {
                        child.material.forEach((material) => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        });

        if (renderer) {
            renderer.dispose();
        }
    });

    return {
        initScene,
        preloadAllModels,
        switchToModel,
        animate,
        handleResize
    };
});
