
import { selectItems } from '@modules/admin-customers';

import { Text } from '@ui.packages/admin-kit';
import { Table, Column } from '@ui.packages/table';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


const customerType = {
  legal: '"ИП"',
  individual: '"Физик"',
};


function getCustomerName(customer) {
  if (customer['type'] === 'legal') {
    return customer[customer['type']]['name'];
  }
  return 'jhgg';
}

function CustomerList() {
  const items = useSelector(selectItems);

  return (
    <div className={styles['wrapper']}>
      <Table columns={items}>
        <Column title={'Тип'} alias={'type'} align={'left'} width={150}>{(value) => <Text>{ customerType[value] }</Text>}</Column>
        <Column title={'Клиент'} align={'left'}>{(value) => <Text type={Text.TYPE_BODY}>{ getCustomerName(value) }</Text>}</Column>
      </Table>
    </div>
  );
}

CustomerList.propTypes = {};

CustomerList.defaultProps = {};

export default CustomerList;
