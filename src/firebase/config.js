import app from 'firebase/app'
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBR1bGs8mbNW2Jq-ic78qwO2D2XrFshr-Q",
  authDomain: "prueb-tt.firebaseapp.com",
  projectId: "prueb-tt",
  storageBucket: "prueb-tt.appspot.com",
  messagingSenderId: "228057856152",
  appId: "1:228057856152:web:7f13eccc6dd24e9cfbf8ed"
};

app.initializeApp(firebaseConfig) //nos permite conectar el proyecto con la base de datos 

export const db = app.firestore() //base de datos
export const storage = app.storage() // storage
export const auth = firebase.auth() //autenticación