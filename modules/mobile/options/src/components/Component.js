
import { Header, Text, Checkbox } from "@ui.packages/mobile-kit";
import { subscribeUser, unsubscribeUser, checkSubscription } from "@ui.packages/web-push";

import React, { useState, useEffect } from 'react';

import styles from "./default.module.scss";


function Options() {
  const [isSubscribe, setSubscribe] = useState(false);

  useEffect(async () => {
    const hasSubscribe = await checkSubscription();
    setSubscribe(hasSubscribe);
  }, [isSubscribe]);

  async function handleChangeSubscribe() {
    console.log(123, isSubscribe)
    if (isSubscribe) {
      await unsubscribeUser(window.localStorage.getItem('userUuid'));
      setSubscribe(false);
    }
    else {
      await subscribeUser(window.localStorage.getItem('userUuid'));
      setSubscribe(true);
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
            <Checkbox value={isSubscribe} onChange={handleChangeSubscribe}>
              <Text>Подписка на push-уведомленния</Text>
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
