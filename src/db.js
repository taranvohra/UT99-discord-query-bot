import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD98HP-Jq52vLzSDe_p_kmywGNjH6FjdiQ',
  authDomain: 'ut99-query-bot.firebaseapp.com',
  databaseURL: 'https://ut99-query-bot.firebaseio.com',
  projectId: 'ut99-query-bot',
  storageBucket: 'ut99-query-bot.appspot.com',
  messagingSenderId: '62258985101',
};

export default firebase.initializeApp(config).database();
