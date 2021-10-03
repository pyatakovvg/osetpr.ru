
import { selectProfile, signOut } from '@ui.packages/application';

import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


function getUserName(data) {
  let name = '';

  if (data['customer']['legal']) {
    if (data['customer']['legal']['name']) {
      name += data['customer']['legal']['name'];
    }
  }
  else {
    name = data['login'];
  }
  return name;
}

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);

  async function handleSignOut() {
    const isSignOut = await dispatch(signOut(profile['id']));
    if (isSignOut) {
      navigate(process.env['PUBLIC_URL'] + '/sign-in');
    }
  }

  if ( ! profile) {
    return null;
  }

  const userName = getUserName(profile);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['profile']}>
        <span className={cn(styles['icon'], "far fa-user-circle")} />
        <div className={styles['row']}>
          <span className={styles['name']}>{ userName }</span>
          <span className={styles['role']}>{ profile['role']['displayName'] }</span>
        </div>
      </div>
      <div className={styles['options']}>
        <div className={styles['list']}>
          <div className={cn(styles['option'], styles['sign-out'])} onClick={() => handleSignOut()}>
            <span className={cn(styles['icon'], "fas fa-sign-out-alt")} />
            <span className={styles['label']}>Выход</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
