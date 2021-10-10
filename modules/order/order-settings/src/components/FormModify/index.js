
import { Header } from '@ui.packages/admin-kit';

import React  from "react";

import Customer from './Customer';
import Password from './Password';
import Notifications from './Notifications';

import styles from './default.module.scss';


function Forms() {
  function handleSubmit(data) {
    console.log(data)
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['section']}>
        <div className={styles['header']}>
          <Header level={3}>Основные</Header>
        </div>
        <div className={styles['content']}>
          <Customer onSubmit={(data) => handleSubmit(data)} />
        </div>
      </div>
      <div className={styles['section']}>
        <div className={styles['header']}>
          <Header level={3}>Смена пароля</Header>
        </div>
        <div className={styles['content']}>
          <Password />
        </div>
      </div>
      <div className={styles['section']}>
        <div className={styles['header']}>
          <Header level={3}>Способ оповещения</Header>
        </div>
        <div className={styles['content']}>
          <Notifications />
        </div>
      </div>
    </div>
  );
}

export default Forms;
