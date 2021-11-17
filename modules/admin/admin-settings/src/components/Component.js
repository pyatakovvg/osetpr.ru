
import { selectInProcess, selectIsPushSubscribe, subscribePushSubscribe, unsubscribePushSubscribe } from '@modules/admin-settings';

import { selectProfile } from '@ui.packages/application';
import { Header, Page, PageContent, CheckBox } from '@ui.packages/admin-kit';
import {checkPushManager, checkServiceWorker} from '@ui.packages/web-push';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';


function Settings() {
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const inProcess = useSelector(selectInProcess);
  const isPushSubscribe = useSelector(selectIsPushSubscribe);

  const hasPushManagerSupport = checkPushManager();
  const hasServiceWorkerSupport = checkServiceWorker();

  function handleSubscribe() {
    if (isPushSubscribe) {
      dispatch(unsubscribePushSubscribe(profile['uuid']));
    }
    else {
      dispatch(subscribePushSubscribe(profile['uuid']));
    }
  }

  return (
    <Page inProcess={inProcess}>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Настройки</Header>
          </div>
          <article className={styles['content']}>
            <div className={styles['section']}>
              <CheckBox
                label={'Подписаться на push-уведомления'}
                value={isPushSubscribe}
                disabled={inProcess || ! hasServiceWorkerSupport || ! hasPushManagerSupport}
                onChange={() => handleSubscribe()}
              />
            </div>
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

export default Settings;
