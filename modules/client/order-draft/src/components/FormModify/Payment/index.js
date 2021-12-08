
import { selectPayments } from '@modules/client-order-draft';

// import { selectInProcess } from '@ui.packages/order';
import { Header, RadioContainerField, Radio, Text } from '@ui.packages/client-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function PaymentForm() {
  const payments = useSelector(selectPayments);
  // const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={2}>Способ оплаты</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['row']}>
          <RadioContainerField name={'payment.code'}>
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
    </div>
  );
}

export default PaymentForm;
