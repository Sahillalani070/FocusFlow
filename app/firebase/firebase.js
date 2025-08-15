// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnxzDcEWfiexlq2wMQyd_7vqIQhv8_8No",
    authDomain: "focusflowstore-235ff.firebaseapp.com",
    projectId: "focusflowstore-235ff",
    storageBucket: "focusflowstore-235ff.firebasestorage.app",
    messagingSenderId: "497380832027",
    appId: "1:497380832027:web:da944504e3609cfa4a59be",
    measurementId: "G-20DMT87524"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Init services
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// export const db = getFirestore(app);