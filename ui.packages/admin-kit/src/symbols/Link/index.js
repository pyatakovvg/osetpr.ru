
import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


export default function LinkHref({ className, href, children, onClick }) {
  return (
    <Link
      className={cn(styles['link'], className)}
      to={process.env['PUBLIC_URL'] + href}
      onClick={onClick && onClick}
    >{ children }</Link>
  );
}

LinkHref.propTypes = {
  className: types.string,
  href: types.string,
  children: types.any,
  onClick: types.func,
};

LinkHref.defaultProps = {
  className: '',
  href: '#',
  children: 'No content Text Default',
  onClick: null,
};
