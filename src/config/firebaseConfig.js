import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAUX2GWTUGoY-yL_UKC-j9df1jmNe_pJ6c",
    authDomain: "todolists-693b6.firebaseapp.com",
    databaseURL: "https://todolists-693b6.firebaseio.com",
    projectId: "todolists-693b6",
    storageBucket: "todolists-693b6.appspot.com",
    messagingSenderId: "797957827724",
    appId: "1:797957827724:web:31a538bc0517792d515fa9",
    measurementId: "G-M99K1P2Y8L"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;