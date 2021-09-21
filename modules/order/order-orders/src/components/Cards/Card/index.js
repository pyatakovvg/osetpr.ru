
import { selectStatuses } from '@modules/order-orders';

import moment from '@packages/moment';

import { Header, Text, Status, Button } from '@ui.packages/admin-kit';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

function Card({ uuid, title, description, status, dateTo, createdAt }) {
  const navigate = useNavigate();

  const statuses = useSelector(selectStatuses);

  const statusName = useMemo(() => statuses.find(item => item['code'] === status['code']), [status['code']]);
  const statusMode = useMemo(() => getStatusMode(status['code']), [status['code']]);
  const isEditable = useMemo(() => status['code'] === 'new', [status['code']]);

  function handleEdit() {
    navigate(process.env['PUBLIC_URL'] + '/orders/' + uuid);
  }

  function handleCancel() {

  }

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
      {isEditable && (
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_OUTLINE}
            mode={Button.MODE_PRIMARY}
            onClick={() => handleEdit()}
          >редактировать</Button>
          <Button
            form={Button.FORM_OUTLINE}
            mode={Button.MODE_DANGER}
            onClick={() => handleCancel()}
          >отменить</Button>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {};

Card.defaultProps = {};

export default Card;
