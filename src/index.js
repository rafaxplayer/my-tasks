import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css';

var config = {
    apiKey: "AIzaSyAgstyE6l15zTlMxJNJ4xJoJkGII1lwYis",
    authDomain: "notas-3ea86.firebaseapp.com",
    databaseURL: "https://notas-3ea86.firebaseio.com",
    projectId: "notas-3ea86",
    storageBucket: "notas-3ea86.appspot.com",
    messagingSenderId: "460798577866"
  };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
