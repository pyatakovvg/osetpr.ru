
import { selectItems } from '@modules/admin-customers';

import { Table, Column } from '@ui.packages/table';
import { Text, Actions } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './default.module.scss';


function CustomerList() {
  const navigate = useNavigate();

  const items = useSelector(selectItems);

  function handleEdit(uuid) {
    navigate(process.env['PUBLIC_URL'] + '/customers/' + uuid);
  }

  return (
    <div className={styles['wrapper']}>
      <Table columns={items}>
        <Column title={'Клиент'} align={'left'}>{(value) => <Text type={Text.TYPE_BODY}>{ value['name'] }</Text>}</Column>
        <Column title={'Телефон'} align={'left'}>{(value) => <Text type={Text.TYPE_BODY}>{ value['phone'] || '---' }</Text>}</Column>
        <Column title={'Активный план'} align={'left'}>{(value) => <Text type={Text.TYPE_BODY}>{ value['plans'][value['plans'].length - 1] ? value['plans'][value['plans'].length - 1]['name'] : '---' }</Text>}</Column>
        <Column
          align={'right'}
          width={40}
        >{(value) => (
          <Actions
            onEdit={() => handleEdit(value['uuid'])}
          />
        )}</Column>
      </Table>
    </div>
  );
}

export default CustomerList;
