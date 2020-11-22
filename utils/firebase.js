import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDAo1cVsfeONZKJblkf02XpJeA1q-WgHYo",
    authDomain: "accounting-001-5262a.firebaseapp.com",
    databaseURL: "https://accounting-001-5262a.firebaseio.com",
    projectId: "accounting-001-5262a",
    storageBucket: "accounting-001-5262a.appspot.com",
    messagingSenderId: "701887556220",
    appId: "1:701887556220:web:3da391e67268fa52e4b7f9",
    measurementId: "G-GZXTTMLS6C"
  })
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export { firebase }