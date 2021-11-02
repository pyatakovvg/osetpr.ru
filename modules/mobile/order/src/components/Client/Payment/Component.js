
import { Button, Header, RadioContainerField, Radio } from '@ui.packages/mobile-kit';

import React from 'react';

import styles from './default.module.scss';


function PaymentForm({ handleSubmit }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header level={2}>Способ оплаты</Header>
        </div>
        <div className={styles['row']}>
          <RadioContainerField name={'payment'}>
            <div className={styles['row']}>
              <Radio name={'cash-to-courier'} label={'наличными курьеру'} />
            </div>
            <div className={styles['row']}>
              <Radio name={'card-to-courier'} label={'картой курьеру'} disabled temp={'Временно недоступно'} />
            </div>
            <div className={styles['row']}>
              <Radio name={'online'} label={'оплата онлайн'} disabled temp={'Временно недоступно'} />
            </div>
          </RadioContainerField>
        </div>
      </div>
      <div className={styles['controls']}>
        <Button mode={'success'}>Выполнить</Button>
      </div>
    </form>
  );
}

export default PaymentForm;
