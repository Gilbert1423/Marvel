// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import{ 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut 
} from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB75OdrcmFFXy8pCrfkPVb_oyC7GucRCUI",
  authDomain: "marvel-4f6a3.firebaseapp.com",
  projectId: "marvel-4f6a3",
  storageBucket: "marvel-4f6a3.firebasestorage.app",
  messagingSenderId: "659719308806",
  appId: "1:659719308806:web:02cc185fe06a4c38052587",
  measurementId: "G-F7QNL584DN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

/*const registroForm = document.getElementById('registro');
registroForm.addEventListener('submit', (e) =>{
    e.preventDefault();
]    const email = document.getElementById('emailRegistro').value;
    const password = document.getElementById('passwordRegistro').value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('usuario registrado: ', user)
        })
    .catch((error) => {
        console.error('no ha sido posible registrarse: ', error)
    })
})*/

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('A iniciado seccion correctamente: ', user)
        })
    .catch((error) => {
        console.error('no ha sido posible iniciar sesion: ', error)
    })
})
//lo que se nesecita para registrar un usuario
const logoutButton = document.getElementById('cerrarSession');
logoutButton.addEventListener('click', () =>{
signOut(auth)
.then(()=>{
    console.log("El usuario a cerrado sesion")
})
.catch((error)=>{
    console.log("no ha sido posible cerrar sesion", error)
})
});
onAuthStateChanged(auth, (user ) =>{
if(user){
    new Notification("Bienvenido a marvel");
    document.getElementById('auth').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}else{
    new Notification("Inicia sesion para no perderte nada")
    document.getElementById('auth').style.display = 'block';
    document.getElementById('content').style.display = 'none';
}   
})
