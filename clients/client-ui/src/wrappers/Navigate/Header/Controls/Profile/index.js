
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


function Profile() {
  const iconClassName = useMemo(() => cn(styles['icon'], 'fas fa-user'), []);

  return (
    <div className={styles['wrapper']}>
      <Link className={styles['profile']} to={process.env['PUBLIC_URL'] + '/profile'}>
        <span className={iconClassName} />
      </Link>
    </div>
  );
}

export default Profile;
