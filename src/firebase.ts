import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDd-XgGK9KnLP1Vf3QCXCgy58LPL4CwnE4',
    authDomain: 'morchella-7a59d.firebaseapp.com',
    projectId: 'morchella-7a59d',
    storageBucket: 'morchella-7a59d.firebasestorage.app',
    messagingSenderId: '264217185412',
    appId: '1:264217185412:web:a517fbddb85dc619eb86d1',
    measurementId: 'G-5MFR4CNG2X'
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
