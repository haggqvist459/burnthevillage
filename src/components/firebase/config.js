import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyDkAcymZFZfWf7s8P4y2qyKY-_09SXdeaE",
    authDomain: "burnthevillage-80012.firebaseapp.com",
    databaseURL: "https://burnthevillage-80012.firebaseio.com",
    projectId: "burnthevillage-80012",
    storageBucket: "burnthevillage-80012.appspot.com",
    messagingSenderId: "457279655537",
    appId: "1:457279655537:web:f36bf00dc51b35302fd5d0",
    measurementId: "G-Z7E2JGMTFC"
};



firebase.initializeApp(firebaseConfig);

export default firebase;