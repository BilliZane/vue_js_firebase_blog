import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB4btJ7y4W63VGxfeeNWUAbQm6PS7sHs54',
  authDomain: 'vue-firebase-blog-3cc50.firebaseapp.com',
  projectId: 'vue-firebase-blog-3cc50',
  storageBucket: 'vue-firebase-blog-3cc50.appspot.com',
  messagingSenderId: '310304244073',
  appId: '1:310304244073:web:faed0175a66b692e4bfdf8',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore svice
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {projectFirestore, timestamp}
