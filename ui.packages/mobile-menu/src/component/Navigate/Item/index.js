
import { closeMenuAction } from '@ui.packages/mobile-menu';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Item({ path, title }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const pathRegExp = new RegExp(path + '$');
  const linkClassName = cn(styles['link'], {
    [styles['active']]: pathRegExp.test(location['pathname'])
  });

  function handleClick() {
    dispatch(closeMenuAction());
  }

  return (
    <Link className={linkClassName} to={process.env['PUBLIC_URL'] + path} onClick={() => handleClick()}>
      <span className={styles['title']}>{ title }</span>
    </Link>
  );
}
