
import { selectOrder } from "@modules/client-order";

import moment from '@packages/moment';
import numeral from "@packages/numeral";
import { Header, Text, Status } from '@ui.packages/client-kit';

import React from 'react';
import { useSelector } from "react-redux";

import Product from './Product';

import cn from "classnames";
import styles from './default.module.scss';


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


function Order() {
  const order = useSelector(selectOrder);

  if ( ! order) {
    return null;
  }

  const address = addressToString(order['address']);
  const statusMode = useStatusMode(order['status']['code']);
  const externalId = order['externalId'].toUpperCase().replace(/(\w{3})(\w{3})(\w{3})/, '$1-$2-$3');

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header>Ваш заказ от { moment(order['createdAt']).format('DD.MM.YYYY') } в { moment(order['createdAt']).format('HH:mm') }</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['order']}>
          <div className={styles['row']}>
            <div className={styles['number']}>
              <span className={styles['title']}>Номер:</span>
              <span className={cn(styles['value'], styles['uppercase'])}>{ externalId }</span>
            </div>
            <div className={styles['status']}>
              <span className={styles['title']}>Статус:</span>
              <span className={styles['value']}>
              <Status mode={statusMode}>{ order['status']['displayName'] }</Status>
            </span>
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['payment']}>
              <span className={styles['title']}>Способ оплаты:</span>
              <span className={styles['value']}>{ order['payment']?.['displayName'] }</span>
            </div>
            <div className={styles['amount']}>
              <span className={styles['title']}>Сумма к оплате:</span>
              <span className={styles['value']}>{ numeral(order['total']).format() } { order['currency']['displayName'] }</span>
            </div>
          </div>
          <div className={styles['address']}>
            <span className={styles['title']}>По адресу:</span>
            <span className={styles['value']}>{ address }</span>
          </div>
          <div className={styles['address']}>
            <span className={styles['title']}>Время доставки:</span>
            <span className={styles['value']}>{ order['dateTo'] ? moment(order['dateTo']).format('DD.MM.YYYY - HH:mm') : 'Как можно быстрее' }</span>
          </div>
          <div className={styles['products']}>
            <div className={styles['container']}>
              {order['products'].map((product) => (
                <div key={product['uuid']} className={styles['product']}>
                  <Product {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles['aside']}>
          <Text>Я запустил через compos, zabbix север состоящий из 3 контейнеров, после чего внес настройки в самом zabbix, создал несколько хостов. Не могу понять, как мне удалить весь проект? удаляю все контейнеры и образы, после нового старта, все равно запускается zabbix сервер с внесенными мной изменениями, с добавленными хостами.</Text>
          <Text>Я запустил через compos, zabbix север состоящий из 3 контейнеров, после чего внес настройки в самом zabbix, создал несколько хостов. Не могу понять, как мне удалить весь проект? удаляю все контейнеры и образы, после нового старта, все равно запускается zabbix сервер с внесенными мной изменениями, с добавленными хостами.</Text>
          <Text>Я запустил через compos, zabbix север состоящий из 3 контейнеров, после чего внес настройки в самом zabbix, создал несколько хостов. Не могу понять, как мне удалить весь проект? удаляю все контейнеры и образы, после нового старта, все равно запускается zabbix сервер с внесенными мной изменениями, с добавленными хостами.</Text>
          <Text>Я запустил через compos, zabbix север состоящий из 3 контейнеров, после чего внес настройки в самом zabbix, создал несколько хостов. Не могу понять, как мне удалить весь проект? удаляю все контейнеры и образы, после нового старта, все равно запускается zabbix сервер с внесенными мной изменениями, с добавленными хостами.</Text>
        </div>
      </div>
    </div>
  );
}

export default Order;
