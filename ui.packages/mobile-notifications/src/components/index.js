
import { selectNotifications, closeNotification } from '@ui.packages/mobile-notifications';

import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import Notification from './Notification';

import styles from './defaults.module.scss';


function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  function handleCloseByIndex(uuid) {
    dispatch(closeNotification(uuid));
  }

  return ReactDOM.createPortal(
    <div className={styles['notifications']}>
      {notifications.map((notification) => (
        <Notification key={notification['uuid']} {...notification} onClose={() => handleCloseByIndex(notification['uuid'])} />
      ))}
    </div>
  , document.querySelector('#notification'));
}

export default Notifications;
