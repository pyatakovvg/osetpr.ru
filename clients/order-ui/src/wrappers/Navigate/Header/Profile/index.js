
import { selectProfile, signOut } from '@ui.packages/application';

import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


function getUserName(data) {
  let name = '';
  if (data['user']) {
    if (data['user']['surname']) {
      name += data['user']['surname'];
    }
    if (data['user']['name']) {
      name += ' ' + data['user']['name'].substr(0, 1) + '.';
    }
    if (data['user']['patronymic']) {
      name += ' ' + data['user']['patronymic'].substr(0, 1) + '.';
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
        <span className={styles['name']}>
          { userName }
        </span>
      </div>
      <div className={styles['options']}>
        <div className={styles['list']}>
          <Link className={styles['option']} to={process.env['PUBLIC_URL'] + '/settings'}>
            <span className={cn(styles['icon'], "fas fa-user-cog")} />
            <span className={styles['label']}>Настройка</span>
          </Link>
          <span className={styles['delimiter']} />
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
