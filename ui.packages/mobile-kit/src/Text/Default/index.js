
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Level1({ isHtml, className, children }) {
  const headerClassName = useMemo(() => cn(styles['text'], className), [className]);

  if (isHtml) {
    return (
      <h1 className={headerClassName} dangerouslySetInnerHTML={{ __html: children }}/>
    );
  }

  return (
    <h1 className={headerClassName}>{ children }</h1>
  );
}

export default Level1;
