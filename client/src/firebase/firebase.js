// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
    appId: process.env.REACT_APP_APP_ID
  };

// Initialize your Firebase app
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

export const signOutOfGoogle = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};


export const onAuthStateChanged = (callback) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    callback(user);
  });
  return unsubscribe;
};




