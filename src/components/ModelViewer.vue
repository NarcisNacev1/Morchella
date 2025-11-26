<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const props = defineProps<{
    modelPath: string;
}>();

const modelContainer = ref<HTMLElement>();
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let currentModel: THREE.Group | null = null;
let animationFrameId: number;

const initScene = () => {
    if (!modelContainer.value) return;

    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(
        75,
        modelContainer.value.clientWidth / modelContainer.value.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 2.5);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(modelContainer.value.clientWidth, modelContainer.value.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    modelContainer.value.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    loadModel(props.modelPath);
};

// Method 1: Center the entire model group (for morel and others)
const centerModelMethod1 = (model: THREE.Group) => {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Calculate the offset needed to center the model
    const offset = center.clone().multiplyScalar(-1);

    // Apply the offset to center the model at world origin
    model.position.copy(offset);

    // Scale the model to a consistent size
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 2.5;
    const scale = targetSize / maxDim;
    model.scale.set(scale, scale, scale);

    return model;
};

// Method 3: Center using a wrapper group (preserves textures)
const centerModelMethod2 = (model: THREE.Group) => {
    // Calculate the bounding box of the entire model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Create a wrapper group
    const wrapper = new THREE.Group();

    // Add the model to the wrapper
    wrapper.add(model);

    // Offset the model within the wrapper to center it
    model.position.set(-center.x, -center.y, -center.z);

    // Scale the wrapper to consistent size
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 2.5;
    const scale = targetSize / maxDim;
    wrapper.scale.set(scale, scale, scale);

    return wrapper;
};

const loadModel = (path: string) => {
    const loader = new GLTFLoader();

    // Remove current model if exists
    if (currentModel) {
        scene.remove(currentModel);
        currentModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                if (Array.isArray(child.material)) {
                    child.material.forEach((material) => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
        currentModel = null;
    }

    loader.load(
        path,
        (gltf) => {
            currentModel = gltf.scene;

            // Remove any bounding box helpers or wireframes
            currentModel.traverse((child) => {
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

            // Reset rotation and scale
            currentModel.rotation.set(0, 0, 0);
            currentModel.scale.set(1, 1, 1);
            currentModel.position.set(0, 0, 0);

            // Choose centering method based on the model
            if (
                path.includes('chanterelle') ||
                path.includes('porcini') ||
                path.includes('amanita')
            ) {
                currentModel = centerModelMethod2(currentModel);
            } else {
                currentModel = centerModelMethod1(currentModel);
            }

            scene.add(currentModel);
        },
        undefined,
        (error) => {
            console.error(`Error loading model from ${path}:`, error);
        }
    );
};

const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    if (currentModel) {
        // Now it should rotate around the proper center
        currentModel.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
};

const handleResize = () => {
    if (!modelContainer.value || !camera || !renderer) return;

    camera.aspect = modelContainer.value.clientWidth / modelContainer.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(modelContainer.value.clientWidth, modelContainer.value.clientHeight);
};

watch(
    () => props.modelPath,
    (newPath) => {
        loadModel(newPath);
    }
);

onMounted(() => {
    initScene();
    animate();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);

    if (renderer) {
        renderer.dispose();
    }
});
</script>

<template>
    <div class="pure-model-viewer">
        <div ref="modelContainer" class="model-canvas"></div>
    </div>
</template>

<style scoped>
.pure-model-viewer {
    width: 900px;
    height: 900px;
    background: transparent;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.model-canvas {
    width: 100%;
    height: 100%;
    background: transparent;
}
</style>
