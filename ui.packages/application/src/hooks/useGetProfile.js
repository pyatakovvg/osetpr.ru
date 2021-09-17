
// import { UnauthorizedError } from '@packages/errors';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useMatch } from 'react-router-dom';

import { getProfile } from '../ducks/commands';
import { isLoadedAction } from "../ducks/slice";


export default function() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignIn = useMatch('/sign-in');

  const [profile, setProfile] = useState(null);

  useEffect(async function checkState() {
    try {
      const result = await dispatch(getProfile());

      setProfile(result);

      if (isSignIn) {
        navigate(process.env['PUBLIC_URL'] + '/');
      }
    }
    catch(error) {

      // if (error instanceof UnauthorizedError) {
      //   navigate(process.env['PUBLIC_URL'] + '/sign-in');
      // }
    }
    finally {
      dispatch(isLoadedAction());
    }
  }, []);

  return profile;
}