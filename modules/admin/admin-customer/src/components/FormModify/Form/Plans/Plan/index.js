
import { selectPlans } from '@modules/admin-customer';

import moment from '@packages/moment';
import { Text, SelectField } from '@ui.packages/admin-kit';

import React  from "react";
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


function Plan({ field, isNew, name, createdAt }) {
  if (isNew) {
    const plans = useSelector(selectPlans);

    return (
      <div className={styles['wrapper']}>
        <div className={styles['name']}>
          <SelectField
            name={`${field}.uuid`}
            options={plans}
            optionKey={'uuid'}
            optionValue={'name'}
          />
        </div>
        <div className={styles['date']}>
          <Text>{ moment().format('DD.MM.YYYY') }</Text>
        </div>
      </div>
    );
  }
  return (
    <div className={cn(styles['wrapper'], {
      [styles['active']]: true
    })}>
      <div className={styles['name']}>
        <Text type={Text.TYPE_BODY}>{ name }</Text>
      </div>
      <div className={styles['date']}>
        <Text>{ moment(createdAt).format('DD.MM.YYYY') }</Text>
      </div>
    </div>
  );
}

export default Plan;
