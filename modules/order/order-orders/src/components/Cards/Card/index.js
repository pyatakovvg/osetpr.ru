
import { selectStatuses, updateStatus } from '@modules/order-orders';

import moment from '@packages/moment';
import numeral from '@packages/numeral';

import { Header, Text, Status, Button } from '@ui.packages/admin-kit';

import types from 'prop-types';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';

import styles from './default.module.scss';


function getStatusMode(code) {
  switch(code) {
    case 'new': return 'danger';
    case 'done': return 'success';
    case 'canceled': return 'warning';
    case 'confirmed': return 'primary';
    case 'process': return 'primary';
    default: return 'default';
  }
}

function Card({ uuid, title, description, status, dateTo, products, total, currency, createdAt }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const statuses = useSelector(selectStatuses);

  const statusName = useMemo(() => statuses.find(item => item['code'] === status['code']), [status['code']]);
  const statusMode = useMemo(() => getStatusMode(status['code']), [status['code']]);
  const isEditable = useMemo(() => status['code'] === 'new', [status['code']]);

  function handleEdit(uuid) {
    navigate(process.env['PUBLIC_URL'] + '/orders/' + uuid);
  }

  function handleCancel(uuid) {
    dispatch(updateStatus(uuid, 'canceled'));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['common']}>
        <div className={styles['information']}>
          <div className={styles['title']}>
            <Header level={4}>{ title }</Header>
          </div>
          <div className={styles['content']}>
            <Text>{ description }</Text>
          </div>
        </div>
        <div className={styles['status']}>
          <div className={styles['status']}>
            <Status mode={statusMode} type={Status.TYPE_LABEL}>{ statusName['displayName'] }</Status>
          </div>
          <div className={styles['date']}>
            <Text type={Text.TYPE_BODY}>На: { moment(dateTo).format('DD.MM.YYYY - HH:mm') }</Text>
          </div>
          <div className={styles['created']}>
            <Text>Создан: { moment(createdAt).format() }</Text>
          </div>
        </div>
      </div>
      <div className={styles['footer']}>
        {products.map((item) => (
          <Product key={item['uuid']} {...item} />
        ))}
        <div className={styles['total-price']}>
          <div className={styles['total']}>
            <Text type={Text.TYPE_BODY}>Итого: { numeral(total).format() } { currency['value'] }</Text>
          </div>
        </div>
      </div>
      {isEditable && (
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CONTEXT}
            mode={Button.MODE_DANGER}
            size={Button.SIZE_SMALL}
            onClick={() => handleCancel(uuid)}
          >Отменить</Button>
          <Button
            mode={Button.MODE_PRIMARY}
            size={Button.SIZE_SMALL}
            onClick={() => handleEdit(uuid)}
          >Редактировать</Button>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  uuid: types.string,
  title: types.string,
  description: types.string,
  status: types.object,
  dateTo: types.string,
  products: types.array,
  total: types.number,
  currency: types.object,
  createdAt: types.string,
};

Card.defaultProps = {
  uuid: '',
  title: 'No title',
  description: 'No description',
  status: {},
  dateTo: new Date(),
  products: [],
  total: 0,
  currency: {},
  createdAt: new Date(),
};

export default Card;
