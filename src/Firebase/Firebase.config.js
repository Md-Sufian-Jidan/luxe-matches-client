// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOD7vccZYo0xcZBOUDmMhAYn5FRGHMYZI",
  authDomain: "luxe-matches-client.firebaseapp.com",
  projectId: "luxe-matches-client",
  storageBucket: "luxe-matches-client.firebasestorage.app",
  messagingSenderId: "796743670620",
  appId: "1:796743670620:web:d573827ca2950c3061bf99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;