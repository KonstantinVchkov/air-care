import SignInForm from '@/components/Forms/SignInForm/SignIn';
import type { NextPage } from 'next';
import React from 'react';
import style from "../styles/form.module.css"

const SignIn: NextPage = () => {
  return (
    <div className={`${style.divForm}`}>
      <SignInForm/>
    </div>
  );
};

export default SignIn;
