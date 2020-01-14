import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCl9qZS_5IiDuo1Uv5QqZH1P038LVDu-cU",
    authDomain: "crown-db-d406b.firebaseapp.com",
    databaseURL: "https://crown-db-d406b.firebaseio.com",
    projectId: "crown-db-d406b",
    storageBucket: "crown-db-d406b.appspot.com",
    messagingSenderId: "98651595459",
    appId: "1:98651595459:web:e549ea1bda3559c9297876",
    measurementId: "G-8WX14RDY5V"
  };


export const createUserProfileDocument = async (userAuth, additionData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if( !snapShot.exists ) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionData
            });
        } catch ( error ) {
            console.log('error creating user ' + error.message)
        };
    }

    return userRef;

}

  firebase.initializeApp(config);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;