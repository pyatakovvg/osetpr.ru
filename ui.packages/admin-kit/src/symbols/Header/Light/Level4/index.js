
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Level4({ className, children, bold }) {
  return (
    <h4 className={cn(styles['header'], { [styles['bold']]: bold }, className)}>{ children }</h4>
  );
}

Level4.propTypes = {
  className: types.string,
  children: types.any,
  bold: types.bool,
};

Level4.defaultProps = {
  className: '',
  children: 'No content Level 1',
  bold: true,
};
