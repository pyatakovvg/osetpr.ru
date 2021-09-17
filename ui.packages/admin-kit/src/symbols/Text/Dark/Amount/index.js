
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Amount({ className, children }) {
  return (
    <p className={cn(styles['text'], className)}>{ children }</p>
  );
}

Amount.propTypes = {
  className: types.string,
  children: types.any,
};

Amount.defaultProps = {
  className: '',
  children: 'No content Text Amount',
};
