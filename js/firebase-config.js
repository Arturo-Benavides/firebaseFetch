const firebaseConfig = {
    apiKey: "AIzaSyBVD1twd9DjeHBbRwv4TVMah81Go_iLelY",
    authDomain: "fir-fetch-fe0ba.firebaseapp.com",
    projectId: "fir-fetch-fe0ba",
    storageBucket: "fir-fetch-fe0ba.firebasestorage.app",
    messagingSenderId: "1014489094280",
    appId: "1:1014489094280:web:8ef7efadf1dbddf397a73d",
    measurementId: "G-F508L83VL6"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
console.log("Firebase initialized:", firebase.apps.length > 0);