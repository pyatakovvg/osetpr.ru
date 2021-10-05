
import {selectItems, selectInProcess, updateStatus, selectCustomers } from '@modules/admin-orders';

import moment from '@packages/moment';
import numeral from '@packages/numeral';

import { Table, Column } from '@ui.packages/table';
import { Text, Status, Button, Actions } from '@ui.packages/admin-kit';

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

function useCustomers() {
  const customers = useSelector(selectCustomers);
  return useMemo(() => customers.reduce((prev, value) => {
    prev[value['userUuid']] = value['name'];
    return prev;
  }, {}), [customers.length]);
}

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);

  const customers = useCustomers();

  function handleEdit(uuid) {
    navigate(process.env['PUBLIC_URL'] + '/orders/' + uuid);
  }

  function handleCancel(uuid) {
    dispatch(updateStatus(uuid, 'canceled'));
  }

  function handleConfirm(uuid) {
    dispatch(updateStatus(uuid, 'confirmed'));
  }

  function handleInProcess(uuid) {
    dispatch(updateStatus(uuid, 'process'));
  }

  function handleClose(uuid) {
    dispatch(updateStatus(uuid, 'finished'));
  }

  function handleFinished(uuid) {
    dispatch(updateStatus(uuid, 'done'));
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
              <Text type={Text.TYPE_BODY}>"{ customers[value['userUuid']] }"</Text>
            </div>
            <div className={styles['description']}>
              <Text type={Text.TYPE_BODY}>{ value['title'] }</Text>
            </div>
            <div className={styles['description']}>
              <Text>{ value['description'] }</Text>
            </div>
          </div>
        )}</Column>
        <Column
          title={'Товары'}
          align={'left'}
        >{({ products, total, currency }) => (
          <div className={styles['products']}>
            {products.map((item) => (
              <Product key={item['uuid']} {...item} />
            ))}
            <span className={styles['total']}>
              <Text type={Text.TYPE_BODY}>Итого: { numeral(total).format() } { currency['value'] }</Text>
            </span>
          </div>
        )}</Column>
        <Column
          title={'На дату'}
          width={200}
          align={'right'}
        >{(value) => {
          return (
            <div className={styles['row']}>
              <div className={styles['status']}>
                <Status type={'label'} mode={getStatusMode(value['status']['code'])}>{ value['status']['displayName'] }</Status>
              </div>
              <div className={styles['date']}>
                <Text type={Text.TYPE_BODY}>На: { moment(value['dateTo']).format('DD.MM.YYYY - HH:mm') }</Text>
              </div>
              {(value['status']['code'] === 'new') && (
                <div className={styles['controls']}>
                  <Button
                    size={Button.SIZE_SMALL}
                    mode={Button.MODE_PRIMARY}
                    form={Button.FORM_CONTEXT}
                    onClick={() => handleCancel(value['uuid'])}
                  >Отменить</Button>
                  <Button
                    size={Button.SIZE_SMALL}
                    mode={Button.MODE_SUCCESS}
                    form={Button.FORM_OUTLINE}
                    onClick={() => handleConfirm(value['uuid'])}
                  >Подтвердить</Button>
                </div>
              )}
              {(value['status']['code'] === 'confirmed') && (
                <div className={styles['controls']}>
                  <Button
                    size={Button.SIZE_SMALL}
                    mode={Button.MODE_PRIMARY}
                    form={Button.FORM_OUTLINE}
                    onClick={() => handleInProcess(value['uuid'])}
                  >Взять в работу</Button>
                </div>
              )}
              {(value['status']['code'] === 'process') && (
                <div className={styles['controls']}>
                  <Button
                    size={Button.SIZE_SMALL}
                    mode={Button.MODE_SUCCESS}
                    form={Button.FORM_OUTLINE}
                    onClick={() => handleFinished(value['uuid'])}
                  >Готов</Button>
                </div>
              )}
              {(value['status']['code'] === 'done') && (
                <div className={styles['controls']}>
                  <Button
                    size={Button.SIZE_SMALL}
                    mode={Button.MODE_SUCCESS}
                    onClick={() => handleClose(value['uuid'])}
                  >Завершить</Button>
                </div>
              )}
            </div>
          );
        }}</Column>
        <Column
          align="right"
          width="30"
        >
          {({ uuid, status }) => (status['code'] === 'new') && (
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
