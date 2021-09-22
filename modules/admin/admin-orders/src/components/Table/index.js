
import { selectItems } from '@modules/admin-orders';

import moment from '@packages/moment';

import { Text, Status } from '@ui.packages/admin-kit';
import { Table, Column } from '@ui.packages/table';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function OrderList() {
  const items = useSelector(selectItems);

  return (
    <div className={styles['wrapper']}>
      <Table columns={items}>
        <Column title={'Заголовок'} alias={'title'} align={'left'}>{(value) => <Text>{ value }</Text>}</Column>
        <Column title={'Описание'} alias={'description'} align={'left'}>{(value) => <Text>{ value }</Text>}</Column>
        <Column
          title={'На дату'}
          alias={'dateTo'}
        >{(value) => {
          return <Text type={Text.TYPE_BODY}>{ moment(value).format() }</Text>;
        }}</Column>
        <Column
          title={'Статус'}
          alias={'status'}
        >{(value) => {
          return <Status>{ value['displayName'] }</Status>;
        }}</Column>
      </Table>
    </div>
  );
}

OrderList.propTypes = {};

OrderList.defaultProps = {};

export default OrderList;
