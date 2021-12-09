
import { selectItems, selectInProcess } from '@modules/admin-plans';

import { Table, Column } from '@ui.packages/table';
import { Text, Actions } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './default.module.scss';


function PlansList() {
  const navigate = useNavigate();

  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);

  function handleEdit(uuid) {
    navigate(process.env['PUBLIC_URL'] + '/plans/' + uuid);
  }
  return (
    <div className={styles['wrapper']}>
      <Table columns={items}>
        <Column
          title={'Название'}
          alias={'name'}
          align={'left'}
        >{(value) => {
          return <Text type={Text.TYPE_BODY}>{ value }</Text>
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

PlansList.propTypes = {};

PlansList.defaultProps = {};

export default PlansList;
