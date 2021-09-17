
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Level2({ className, children, bold }) {
  return (
    <h2 className={cn(styles['header'], { [styles['bold']]: bold }, className)}>{ children }</h2>
  );
}

Level2.propTypes = {
  className: types.string,
  children: types.any,
  bold: types.bool,
};

Level2.defaultProps = {
  className: '',
  children: 'No content Level 2',
  bold: true,
};
