
import { selectIsPushSubscribe, selectInProcess, subscribePushSubscribe, unsubscribePushSubscribe } from '@modules/mobile-options';

import { checkServiceWorker } from "@ui.packages/web-push";
import { Header, Text, Checkbox } from "@ui.packages/mobile-kit";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "./default.module.scss";


function Options() {
  const dispatch = useDispatch();

  const inProcess = useSelector(selectInProcess);
  const hasSubscribe = useSelector(selectIsPushSubscribe);

  const hasServiceWorkerSupport = checkServiceWorker();


  async function handleChangeSubscribe() {
    if (hasSubscribe) {
      dispatch(unsubscribePushSubscribe(window.localStorage.getItem('userUuid')));
    }
    else {
      dispatch(subscribePushSubscribe(window.localStorage.getItem('userUuid')));
    }
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Настройка</Header>
        </div>
        <div className={styles['information']}>
          <div className={styles['row']}>
            <Checkbox
              value={hasSubscribe}
              disabled={inProcess || ! hasServiceWorkerSupport}
              onChange={handleChangeSubscribe}
            >
              <Text>Подписка на push-уведомленния</Text>
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
