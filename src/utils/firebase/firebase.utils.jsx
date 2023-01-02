import { initializeApp } from 'firebase/app';
import { getAuth , signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDM3GTxbT-05gUKD8iypDO70XSj9xuODwM",
  authDomain: "crown-clothing-database-97da0.firebaseapp.com",
  projectId: "crown-clothing-database-97da0",
  storageBucket: "crown-clothing-database-97da0.appspot.com",
  messagingSenderId: "724222952725",
  appId: "1:724222952725:web:93307bc172acd0f5a6551c"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth , additionalinformation = {}) => {

  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot.exists());

  if(!userSnapShot.exists()) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalinformation
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return

   return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return

   return await signInWithEmailAndPassword(auth, email, password);
};