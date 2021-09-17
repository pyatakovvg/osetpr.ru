
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Level3({ className, children, bold }) {
  return (
    <h3 className={cn(styles['header'], { [styles['bold']]: bold }, className)}>{ children }</h3>
  );
}

Level3.propTypes = {
  className: types.string,
  children: types.any,
  bold: types.bool,
};

Level3.defaultProps = {
  className: '',
  children: 'No content Level 3',
  bold: true,
};
