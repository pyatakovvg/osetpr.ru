
import { selectStatuses} from '@modules/order-main';

import moment from '@packages/moment';

import { Header, Text, Select, Status } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function Card({ title, description, status, dateTo, createdAt }) {
  const statuses = useSelector(selectStatuses);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <div className={styles['title']}>
          <Status/>
          <Header level={4}>{ title }</Header>
        </div>
        <div className={styles['date']}>
          <Text>{ moment(dateTo).format() }</Text>
        </div>
      </div>
      <div className={styles['content']}>
        <Text>{ description }</Text>
      </div>
      <div className={styles['footer']}>
        <div className={styles['created']}>
          <Text>{ moment(createdAt).format() }</Text>
        </div>
        <div className={styles['status']}>
          <Select
            clearable={false}
            options={statuses}
            value={status['code']}
            optionKey={'code'}
            optionValue={'displayName'}
          />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {};

Card.defaultProps = {};

export default Card;
