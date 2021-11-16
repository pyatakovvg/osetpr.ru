
import { selectPayments } from '@modules/mobile-order-draft';

import { selectInProcess } from '@ui.packages/order';
import { Button, Header, RadioContainerField, Radio, Text } from '@ui.packages/mobile-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function PaymentForm({ handleSubmit }) {
  const payments = useSelector(selectPayments);
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header level={2}>Способ оплаты</Header>
        </div>
        <div className={styles['row']}>
          <RadioContainerField name={'code'}>
            {payments.map((payment) => (
              <div key={payment['code']} className={styles['row']}>
                <Radio name={payment['code']} label={payment['displayName']} disabled={ ! payment['isUse']} temp={'Временно недоступно'} />
              </div>
            ))}
          </RadioContainerField>
        </div>
        <div className={styles['description']}>
          <Text type={Text.type.description}>"Проверьте, чек должен быть приложен к доставке"</Text>
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          mode={'success'}
          inProcess={inProcess}
        >Выбрать</Button>
      </div>
    </form>
  );
}

export default PaymentForm;
