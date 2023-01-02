import React from 'react';
import { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.style.scss';
import Button from '../button/button.component';


const defaultFormField = {
  email: '',
  password: '',
}


function SignInForm() {

  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    try {
      const response =  await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();

    } catch (error) {

      switch (error.code) {
        case 'auth/wrong-password':
          alert('Password is incorrect');
          break;
        case 'auth/user-not-found':
          alert('username is incorrect')
          break;
      
        default:
         console.log(error)
      }
      
    }

  }


  const handleChange = (event) => {
    
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value});
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form  onSubmit={ handleSubmit }>
     
        <FormInput label="Email" required type="email" onChange={handleChange} name='email' value={email} />

        <FormInput label="Password" required type="password" onChange={handleChange} name='password' value={password} />

        <div className='buttons-container'>
        <Button type="submit">Sign In</Button>
        <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>

    </div>
  )
}

export default SignInForm;