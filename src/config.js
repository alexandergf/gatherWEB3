import Firebase from 'firebase';  
let config = {  
  apiKey: 'AIzaSyDHf2h5HMoKswLeZpwKKU23R9vQhR6ug6c',
  authDomain: 'gatherv2.firebaseapp.com',
  databaseURL: 'gatherv2.firebaseio.com',
  projectId: 'gatherv2',
  storageBucket: 'gatherv2.appspot.com',
  messagingSenderId: '531957941425'
};
let app = Firebase.initializeApp(config);  
export const db = app.database();  