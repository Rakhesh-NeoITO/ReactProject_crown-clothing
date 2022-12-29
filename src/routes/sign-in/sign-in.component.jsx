import React from 'react';
import { signInWithGooglePopup , createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

export default function SignIn() {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);

    console.log(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign in with google
      </button>
    </div>
  )
}
