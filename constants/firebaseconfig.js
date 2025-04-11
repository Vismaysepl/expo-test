// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as config from '../node-fb-b8462-firebase-adminsdk-fbsvc-715abf5ba8.json'

const firebaseConfig = config

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
