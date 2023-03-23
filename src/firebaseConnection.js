import { initializeApp } from 'firebase/app' // Importando o nosso App
import { getFirestore } from "firebase/firestore" // Importando o banco de dados do firebase, que é o firestore.
import { getAuth } from 'firebase/auth'

const firebaseConfig = { // Configuração do projeto criado no firebase
    apiKey: "AIzaSyCsqZw6KiSxTfN-PtzwvNqJBSf75KWKMIU",
    authDomain: "cursofirebase-b97d5.firebaseapp.com",
    projectId: "cursofirebase-b97d5",
    storageBucket: "cursofirebase-b97d5.appspot.com",
    messagingSenderId: "1069772441489",
    appId: "1:1069772441489:web:5315509615b0ee65a7bc30",
    measurementId: "G-WZ47799LLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig) // Jogando as configurações da aplicação dentro do variável app

const db = getFirestore(app) // Jogando as configurações da aplicação dentro do banco de dados na variável db
const auth = getAuth(app)

export { db, auth }; // Exportando as configurações do banco. Tem que desconstruir devido ser uma variável com várias configurações, e para que possamos acessa-lás. Sempre que exportar com export sem o defaul, tem que ser com chaves.