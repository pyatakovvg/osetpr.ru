
import { deleteItem, selectItems } from '@modules/order-main';

import { Table, Column } from '@ui.packages/table';
import { Actions, Text } from '@ui.packages/admin-kit';
import { Confirm, openDialog, closeDialog } from '@ui.packages/dialog';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';


function Types() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [itemId, setItemId] = useState(null);

  function handleEdit(value) {
    dispatch(openDialog('attribute', value));
  }

  function handleSetDeletedItem(id) {
    setItemId(id);
    dispatch(openDialog('confirm'));
  }

  function handleResetDeletedItem() {
    setItemId(null);
    dispatch(closeDialog('confirm'));
  }

  function handleDelete(id) {
    dispatch(deleteItem([ id ]));
    dispatch(closeDialog('confirm'));
  }

  return (
    <div className={styles['content']}>
      <div className={styles['table']}>
        <Table columns={items}>
          <Column
            title="Значение"
            alias="value"
            width="250"
            align="left"
          >
            {(value) => <Text type={Text.TYPE_BODY}>{ value }</Text>}
          </Column>
          <Column
            title="Величина"
            alias="unit"
            width="70"
            align="left"
          >
            {(value) => (
              value
                ? <Text type={Text.TYPE_BODY}>{ value['value'] }</Text>
                : <Text>---</Text>
              )}
          </Column>
          <Column
            title="Тип поля"
            alias="type"
            align="left"
          >
            {(value) => <Text type={Text.TYPE_BODY}>{ value }</Text>}
          </Column>
          <Column
            title="Описание"
            alias="description"
            align="left"
          >
            {(value) => <Text type={Text.TYPE_COMMENT}>{ value }</Text>}
          </Column>
          <Column
            align="right"
            width="45"
          >
            {(value) => <Actions onEdit={() => handleEdit(value)} onDelete={() => handleSetDeletedItem(value['id'])} />}
          </Column>
        </Table>
      </div>

      <Confirm
        message="Вы уверены, что хотите удалить Аттрибут продукта?"
        onConfirm={() => handleDelete(itemId)}
        onCancel={() => handleResetDeletedItem()}
      />
    </div>
  );
}

Types.propTypes = {};

Types.defaultProps = {};

export default Types;
