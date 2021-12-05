
import React from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


function FilterReset() {
  return (
    <Link className={styles['wrapper']} to={process.env['PUBLIC_URL'] + '/'}>
      <span className={cn(styles['icon'], 'fas fa-times')} />
      <span className={styles['title']}>сбросить фильтр</span>
    </Link>
  );
}

export default FilterReset;
