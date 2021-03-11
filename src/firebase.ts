import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAttARzXFbAreQhdIaAKPMsn6bPzbTMA8o',
  authDomain: 'manuscripts-kyonenya.firebaseapp.com',
  projectId: 'manuscripts-kyonenya',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
