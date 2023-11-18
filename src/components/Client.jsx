import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth'

const config = {
    apiKey: "AIzaSyDWKa7ODNI8-Dvt97yP4SY08kfXvenftco",
    authDomain: "branch-66643.firebaseapp.com",
    projectId: "branch-66643",
    storageBucket: "branch-66643.appspot.com",
    messagingSenderId: "177237548415",
    appId: "1:177237548415:web:9902e7744c4ada85290e4a",
    measurementId: "G-QMXV94XGJE"
}

export const app = initializeApp(config);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);