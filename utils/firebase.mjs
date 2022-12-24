// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKFLcZqnFbfgu1kq5OZ8HdCnvLRQ7sg4M",
    authDomain: "fizzbee-party-mode.firebaseapp.com",
    projectId: "fizzbee-party-mode",
    databaseURL: 'https://fizzbee-party-mode-default-rtdb.firebaseio.com',
    storageBucket: "fizzbee-party-mode.appspot.com",
    messagingSenderId: "1097041977414",
    appId: "1:1097041977414:web:a4f4e74e741b33a4e06a47",
    measurementId: "G-SX8H84JFSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
