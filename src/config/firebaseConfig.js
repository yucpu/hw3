import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBF4Q3j16esc0RduaU6Q6Q6VUmhfiNZZ0w",
    authDomain: "todolists-2f04c.firebaseapp.com",
    databaseURL: "https://todolists-2f04c.firebaseio.com",
    projectId: "todolists-2f04c",
    storageBucket: "todolists-2f04c.appspot.com",
    messagingSenderId: "1090266007136",
    appId: "1:1090266007136:web:0175a0aca26ad91b95a505",
    measurementId: "G-Z23YR88CF7"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;