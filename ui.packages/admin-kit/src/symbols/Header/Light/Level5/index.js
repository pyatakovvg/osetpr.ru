
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Level4({ className, children, bold }) {
  return (
    <h5 className={cn(styles['header'], { [styles['bold']]: bold }, className)}>{ children }</h5>
  );
}

Level4.propTypes = {
  className: types.string,
  children: types.any,
  bold: types.bool,
};

Level4.defaultProps = {
  className: '',
  children: 'No content Level 5',
  bold: true,
};
