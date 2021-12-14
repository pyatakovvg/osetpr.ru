
import React from 'react';
import { useLocation } from 'react-router-dom';

import Cart from './Cart';
// import Profile from './Profile';

import styles from './default.module.scss';


function Controls({ isOut }) {
  const location = useLocation();

  return (
    <div className={styles['wrapper']}>
      {/*<div className={styles['col']}>*/}
      {/*  <Profile />*/}
      {/*</div>*/}
      { ! /order/.test(location['pathname']) && (
        <div className={styles['col']}>
          <Cart isOut={isOut} />
        </div>
      )}
    </div>
  );
}

export default Controls;
