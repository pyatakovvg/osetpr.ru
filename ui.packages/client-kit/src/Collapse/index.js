
import { Header } from '@ui.packages/mobile-kit';

import React, { useState } from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Collapse({ title, defaultState, children }) {
  const [isOpen, setOpen] = useState(defaultState);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']} onClick={() => setOpen( ! isOpen)}>
        <div className={styles['title']}>
          <Header level={3}>{ title }</Header>
        </div>
        <div className={styles['type']}>
          {isOpen
            ? <span className={cn(styles['icon'], 'fas fa-minus')} />
            : <span className={cn(styles['icon'], 'fas fa-plus')} />}
        </div>
      </div>
      {isOpen && (
        <div className={styles['content']}>
          { children }
        </div>
      )}
    </div>
  );
}

Collapse.propTypes = {
  disabled: types.bool,
  defaultState: types.bool,
};

Collapse.defaultProps = {
  disabled: false,
  defaultState: false,
};
