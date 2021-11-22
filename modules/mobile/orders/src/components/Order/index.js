
import moment from '@packages/moment';
import numeral from '@packages/numeral';

import { Text } from '@ui.packages/mobile-kit';

import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';
import {Status} from "@ui.packages/mobile-kit";


function addressToString(data) {
  let address = '';
  if (data && data instanceof Object) {
    if (data['city']) {
      address += 'г.' + data['city'];
    }
    if (data['street']) {
      address += ', ул.' + data['street'];
    }
    if (data['house']) {
      address += ', д.' + data['house'];
    }
    if (data['building']) {
      address += ', к.' + data['building'];
    }
    if (data['front']) {
      address += ', п.' + data['front'];
    }
    if (data['apartment']) {
      address += ', кв.' + data['apartment'];
    }
    if (data['floor']) {
      address += ', эт.' + data['floor'];
    }
  }
  return address;
}

function useStatusMode(code) {
  switch(code) {
    case 'done':
    case 'confirmed':
    case 'process': return 'primary';
    case 'finished': return 'success';
    case 'canceled': return 'danger';
    default: return 'default';
  }
}


export default function Order({ externalId, address, status, total, currency, createdAt }) {
  const stringAddress = addressToString(address);
  const statusMode = useStatusMode(status['code']);
  const stringExternalId = externalId.toUpperCase().replace(/(\w{3})(\w{3})(\w{3})/, '$1-$2-$3');

  return (
    <Link className={styles['wrapper']} to={process.env['PUBLIC_URL'] + '/orders/' + externalId}>
      <div className={styles['line']}>
        <div className={styles['external-id']}>
          <Text type={Text.type.bold} className={styles['bold']}>{ stringExternalId }</Text>
        </div>
        <div className={styles['status']}>
          <Status mode={statusMode}>{ status['displayName'] }</Status>
        </div>
      </div>
      <div className={styles['line']}>
        <div className={styles['date']}>
          <Text className={styles['small']}>{ moment(createdAt).format('DD.MM.YYYY HH:mm') }</Text>
        </div>
        <div className={styles['amount']}>
          <Text type={Text.type.bold}>{ numeral(total).format() } { currency['displayName'] }</Text>
        </div>
      </div>
      <div className={styles['line']}>
        <Text>{ stringAddress }</Text>
      </div>
    </Link>
  );
}

Order.propTypes = {
  imageUuid: types.string,
  title: types.string,
  value: types.string,
  number: types.number,
  price: types.number,
  total: types.number,
  currency: types.object,
};

Order.defaultProps = {
  externalId: null,
  imageUuid: null,
  title: 'Нет названия',
  value: '---',
  number: 0,
  price: 0,
  total: 0,
  currency: { value: 'руб.' },
};
