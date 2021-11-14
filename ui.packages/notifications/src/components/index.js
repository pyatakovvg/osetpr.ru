
import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import Notification from './Notification';
import { selectNotifications, closeNotification } from '../ducks/slice';

import styles from './defaults.module.scss';


function Notifications() {
  console.log(document.querySelector('#notification'))
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);


  function handleCloseByIndex(uuid) {
    dispatch(closeNotification(uuid));
  }

  return ReactDOM.createPortal(
    <div className={styles['notifications']}>
      <div className={styles['notifications__content']}>
        {notifications.map((notification) => (
          <Notification key={notification['uuid']} {...notification} onClose={() => handleCloseByIndex(notification['uuid'])} />
        ))}
      </div>
    </div>
  , document.querySelector('#notification'));
}

export default Notifications;
