
import { selectStatuses } from '@modules/order-orders';

import moment from '@packages/moment';

import { Header, Text, Status } from '@ui.packages/admin-kit';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function getStatusMode(code) {
  switch(code) {
    case 'new': return 'danger';
    case 'done': return 'success';
    case 'canceled': return 'warning';
    case 'confirmed': return 'primary';
    default: return 'default';
  }
}

function Card({ title, description, status, dateTo, createdAt }) {
  const statuses = useSelector(selectStatuses);
  const statusName = useMemo(() => statuses.find(item => item['code'] === status['code']), [status['code']]);
  const statusMode = useMemo(() => getStatusMode(status['code']), [status['code']]);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <div className={styles['title']}>
          <Header level={4}>{ title }</Header>
        </div>
        <div className={styles['date']}>
          <Text>Исполнить до: { moment(dateTo).format() }</Text>
        </div>
      </div>
      <div className={styles['content']}>
        <Text>{ description }</Text>
      </div>
      <div className={styles['footer']}>
        <div className={styles['created']}>
          <Text>Заведен: { moment(createdAt).format() }</Text>
        </div>
        <div className={styles['status']}>
          <Status mode={statusMode}>{ statusName['displayName'] }</Status>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {};

Card.defaultProps = {};

export default Card;
