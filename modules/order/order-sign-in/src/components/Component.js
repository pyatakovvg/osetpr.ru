
import { signIn } from '@ui.packages/application';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Form from './Form';

import styles from './default.module.scss';


function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignIn(data) {
    const isSuccess = await dispatch(signIn(data));
    if (isSuccess) {
      navigate(process.env['PUBLIC_URL'] + '/');
    }
  }

  return (
    <div className={styles['wrapper']}>
      <Form onSubmit={(data) => handleSignIn(data)} />
    </div>
  );
}

export default SignIn;
