
import { selectItems, selectInProcess } from '@modules/admin-orders';

import moment from '@packages/moment';

import { Table, Column } from '@ui.packages/table';
import { Text, Status, Actions } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Product from './Product';

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


function OrderList() {
  const navigate = useNavigate();

  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);

  function handleEdit(uuid) {
    navigate(process.env['PUBLIC_URL'] + '/orders/' + uuid);
  }

  return (
    <div className={styles['wrapper']}>
      <Table columns={items}>
        <Column
          alias={'status'}
          width={20}
        >{(value) => {
          const mode = getStatusMode(value['code']);
          return <Status mode={mode} />;
        }}</Column>
        <Column
          title={'Описание'}
          align={'left'}
          width={200}
        >{(value) => (
          <div className={styles['row']}>
            <div className={styles['title']}>
              <Text type={Text.TYPE_BODY}>{ value['title'] }</Text>
            </div>
            <div className={styles['description']}>
              <Text>{ value['description'] }</Text>
            </div>
          </div>
        )}</Column>
        <Column
          title={'Товары'}
          alias={'products'}
          align={'left'}
        >{(products) => products.map((item) => (
          <Product key={item['uuid']} {...item} />
        ))}</Column>
        <Column
          title={'На дату'}
          width={120}
          align={'right'}
        >{(value) => {
          return (
            <div className={styles['row']}>
              <div className={styles['status']}>
                <Status type={'text'} mode={getStatusMode(value['status']['code'])}>{ value['status']['displayName'] }</Status>
              </div>
              <div className={styles['date']}>
                <Text type={Text.TYPE_BODY}>{ moment(value['dateTo']).format() }</Text>
              </div>
            </div>
          );
        }}</Column>
        <Column
          align="right"
          width="30"
        >
          {({ uuid }) => (
            <Actions
              disabled={inProcess}
              onEdit={() => handleEdit(uuid)}
              // onDelete={() => handleRemoveProduct(uuid)}
            />
          )}
        </Column>
      </Table>
    </div>
  );
}

OrderList.propTypes = {};

OrderList.defaultProps = {};

export default OrderList;
