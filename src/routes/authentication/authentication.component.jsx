import React from 'react';
import './authentication.style.scss'
import  SignUpForm  from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

export default function Authentication() {
  
  
  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
     
    </div>
  )
}
