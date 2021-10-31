
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Item({ path, title }) {
  console.log(path)
  const location = useLocation();
  const pathRegExp = new RegExp(path.replace('/', ''), 'i');

  const linkClassName = cn(styles['link'], {
    [styles['active']]: pathRegExp.test(location['path'])
  });

  return (
    <Link className={linkClassName} to={process.env['PUBLIC_URL'] + path}>
      <span className={styles['title']}>{ title }</span>
    </Link>
  );
}
