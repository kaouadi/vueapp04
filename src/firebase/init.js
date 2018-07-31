
import firebase from "firebase";
import firestore from "firebase/firestore"




// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRimyF24KL4AwOa2EK1-m0lGqitNly2l4",
    authDomain: "ninja-smoothie-b51b8.firebaseapp.com",
    databaseURL: "https://ninja-smoothie-b51b8.firebaseio.com",
    projectId: "ninja-smoothie-b51b8",
    storageBucket: "ninja-smoothie-b51b8.appspot.com",
    messagingSenderId: "310610311711"
  };
  const firebaseApp =  firebase.initializeApp(config);

  firebaseApp.firestore().settings({timestampsInSnapshots: true})

  // export database
  export default firebaseApp.firestore()