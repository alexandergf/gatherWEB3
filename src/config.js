import Firebase from 'firebase';  
import {API_KEY_MAPS} from 'react-native-dotenv';
let config = {  
  apiKey: API_KEY_MAPS,
  authDomain: 'gatherv2.firebaseapp.com',
  databaseURL: 'gatherv2.firebaseio.com',
  projectId: 'gatherv2',
  storageBucket: 'gatherv2.appspot.com',
  messagingSenderId: '531957941425'
};
let app = Firebase.initializeApp(config);  
export const db = app.database();  