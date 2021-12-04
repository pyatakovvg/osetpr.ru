
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

  const classNameClose = cn('fas fa-times', styles['notification__close']);
  const classNameNotification = cn(styles['notification'], {
    [styles['mode--info']]: (mode === Mode.INFO),
    [styles['mode--danger']]: (mode === Mode.DANGER),
    [styles['mode--success']]: (mode === Mode.SUCCESS),
    [styles['mode--warning']]: (mode === Mode.WARNING),
    [styles['mode--primary']]: (mode === Mode.PRIMARY),
  });
  const classNameIcon = cn(styles['icon'], {
    [styles['icon--info']]: (mode === Mode.INFO),
    [styles['icon--danger']]: (mode === Mode.DANGER),
    [styles['icon--primary']]: (mode === Mode.PRIMARY),
    [styles['icon--warning']]: (mode === Mode.WARNING),
    [styles['icon--success']]: (mode === Mode.SUCCESS),
  }, {
    'far fa-bookmark': (mode === Mode.PRIMARY),
    'fas fa-exclamation': (mode === Mode.INFO),
    'far fa-check-circle': (mode === Mode.SUCCESS),
    'fas fa-exclamation-circle': (mode === Mode.DANGER),
  });

  return (
    <div className={classNameNotification}>
      <span className={classNameClose} onClick={handleClose} />
      {( ! Mode.DEFAULT) && (
        <div className={styles['notification__icon']}>
          <span className={classNameIcon} />
        </div>
      )}
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
  mode: types.oneOf([Mode.DEFAULT, Mode.SUCCESS, Mode.PRIMARY, Mode.INFO, Mode.DANGER, Mode.WARNING]),
  onClose: types.func,
};

Notification.defaultProps = {
  autoClose: true,
  timeout: 3,
  title: '',
  content: '',
  mode: Mode.DEFAULT,
};

export default Notification;
