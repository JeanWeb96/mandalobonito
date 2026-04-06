import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importamos la base de datos

const firebaseConfig = {
  apiKey: "AIzaSyAuFY3AKJFfJ7FjJ-AxpqrL27shN-J7DU4",
  authDomain: "mandalobonito-db.firebaseapp.com",
  projectId: "mandalobonito-db",
  storageBucket: "mandalobonito-db.firebasestorage.app",
  messagingSenderId: "192275599595",
  appId: "1:192275599595:web:ceaa9db0536ea7dbe2aeae",
  measurementId: "G-Z3WLF2Q5B"
};

const app = initializeApp(firebaseConfig);
// Exportamos 'db' para que 'constants.ts' pueda leer tus productos
export const db = getFirestore(app);