
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useMatch } from 'react-router-dom';

import { selectRedirectTo401, resetStateAction } from "../ducks/slice";


export default function() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignIn = useMatch('/sign-in');
  const isRedirectTo401 = useSelector(selectRedirectTo401);

  const [isInit, setInit] = useState(null);

  useEffect(function checkState() {
    if (isInit) {
      if (isRedirectTo401) {
        if ( ! isSignIn) {
          navigate(process.env['PUBLIC_URL'] + '/sign-in');
        }
        dispatch(resetStateAction());
      }
    }
    else {
      setInit(true);
    }
  }, [isRedirectTo401]);
}