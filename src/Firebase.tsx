import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDSF_sNiU-yIOUI_yisZsExr5s7ikfqG8A",
    authDomain: "eastrosesun78.firebaseapp.com",
    databaseURL: "https://eastrosesun78.firebaseio.com",
    projectId: "eastrosesun78",
    storageBucket: "eastrosesun78.appspot.com",
    messagingSenderId: "915782056120",
    appId: "1:915782056120:web:9b4644a3a65711ba985c4d",
    //measurementId: "G-E7CMCFTMYD"
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let user = {};
/* const doAuth = () => {
    console.log('doAuth');
    signInWithEmailAndPassword(auth, 'eastrosesun@mitr.com', 'welcome')
        .then((res) => {

            user = res.user;
        })
}
doAuth(); */
export { app, db, user }