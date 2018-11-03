import firebase from 'firebase';
import dotenv from 'dotenv';

dotenv.config();
const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MSGING_SENDER_ID,
};

export default firebase.initializeApp(config).database();
