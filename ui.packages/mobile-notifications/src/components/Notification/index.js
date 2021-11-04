
import { Mode } from '@ui.packages/types';
import { Timeout } from '@ui.packages/timer';

import types from 'prop-types';
import React, { useEffect } from 'react';

import cn from 'classnames';
import styles from './defaults.module.scss';


function Notification({ autoClose, onClose, timeout, title, content, mode }) {
  const timer = new Timeout();

  useEffect(() => {
    if (autoClose) {
      timer.start(() => handleClose(), timeout);
    }
  }, []);

  function handleClose() {
    timer.reset();
    onClose();
  }

  const classNameNotification = cn(styles['notification'], {
    [styles['mode--info']]: (mode === Mode.INFO),
    [styles['mode--danger']]: (mode === Mode.DANGER),
    [styles['mode--success']]: (mode === Mode.SUCCESS),
    [styles['mode--warning']]: (mode === Mode.WARNING),
    [styles['mode--primary']]: (mode === Mode.PRIMARY),
  });

  return (
    <div className={classNameNotification}>
      <span className={styles['notification__close']} onClick={() => handleClose()} />
      <div className={styles['notification__block']}>
        {title && <span className={styles['notification__title']} role="header">{ title }</span>}
        {content && <span className={styles['notification__content']}>{ content }</span>}
      </div>
    </div>
  );
}

Notification.propTypes = {
  autoClose: types.bool,
  timeout: types.number,
  title: types.string,
  content: types.string,
  mode: types.oneOf(['success', 'danger']),
  onClose: types.func,
};

Notification.defaultProps = {
  autoClose: true,
  timeout: 2,
  title: '',
  content: '',
  mode: 'success',
};

export default Notification;
