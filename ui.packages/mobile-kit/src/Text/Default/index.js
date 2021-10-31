
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Level1({ className, children }) {
  const headerClassName = useMemo(() => cn(styles['text'], className), [className]);
  return (
    <h1 className={headerClassName}>{ children }</h1>
  );
}

export default Level1;
