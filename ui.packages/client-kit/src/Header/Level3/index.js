
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Level1({ className, children }) {
  const headerClassName = useMemo(() => cn(styles['header'], className), [className]);
  return (
    <h3 className={headerClassName}>{ children }</h3>
  );
}

export default Level1;
