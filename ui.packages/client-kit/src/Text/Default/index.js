
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Text({ isHtml, className, children }) {
  const headerClassName = useMemo(() => cn(styles['text'], className), [className]);

  if (isHtml) {
    return (
      <p className={headerClassName} dangerouslySetInnerHTML={{ __html: children }}/>
    );
  }

  return (
    <p className={headerClassName}>{ children }</p>
  );
}

export default Text;
