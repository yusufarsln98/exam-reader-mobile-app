

// Import the functions you need from the SDKs you need

// https://firebase.google.com/docs/web/setup#available-libraries
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";



const firebaseConfig = {
    apiKey: "AIzaSyCuMG02YcHPsc1OnnJRMyKTGZdlJ921ZRw",
    authDomain: "optical-34558.firebaseapp.com",
    projectId: "optical-34558",
    storageBucket: "optical-34558.appspot.com",
    messagingSenderId: "703016222930",
    appId: "1:703016222930:web:a6eb1fee5d6f4ed7432d0b",
    measurementId: "G-DD6SCR9GY2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;