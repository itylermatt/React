import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCYAg14hDBd8ai_ILnLdoVf_IyollrwQMc",
    authDomain: "ultrasense-mobile-app.firebaseapp.com",
    databaseURL: "https://ultrasense-mobile-app.firebaseio.com",
    projectId: "ultrasense-mobile-app",
    storageBucket: "ultrasense-mobile-app.appspot.com",
    messagingSenderId: "1010734950444",
    appId: "1:1010734950444:web:5286d8b9fdc00947"
};

firebase.initializeApp(firebaseConfig);
export default firebase;