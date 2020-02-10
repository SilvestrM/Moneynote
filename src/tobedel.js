import { initializeApp } from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD4_DX4uVVLY3PMJCEZhDyAgLhHWOr9bmo",
    authDomain: "moneynote-4cba7.firebaseapp.com",
    databaseURL: "https://moneynote-4cba7.firebaseio.com",
    projectId: "moneynote-4cba7",
    storageBucket: "moneynote-4cba7.appspot.com",
    messagingSenderId: "1013326584513",
    appId: "1:1013326584513:web:abed45db0c648f4dab9240"
};
// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);

export const db = fireApp.database();