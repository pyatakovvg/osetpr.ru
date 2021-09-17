
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Level1({ className, children, bold }) {
  return (
    <h1 className={cn(styles['header'], { [styles['bold']]: bold }, className)}>{ children }</h1>
  );
}

Level1.propTypes = {
  className: types.string,
  children: types.any,
  bold: types.bool,
};

Level1.defaultProps = {
  className: '',
  children: 'No content Level 1',
  bold: true,
};
