import {initializeApp, getApp} from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(),
})

export {app, auth, getApp, getAuth};
