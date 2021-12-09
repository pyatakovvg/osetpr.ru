
import { Table, Column } from '@ui.packages/table';
import { Actions, Text, Image } from '@ui.packages/admin-kit';
import { Confirm, Dialog, openDialog, closeDialog } from '@ui.packages/admin-dialog';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectItems } from '../../ducks/slice';
import { deleteGallery } from '../../ducks/commands';


function Types() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [itemId, setItemId] = useState(null);

  function handleSetDeletedItem(id) {
    setItemId(id);
    dispatch(openDialog('confirm'));
  }

  function handleResetDeletedItem() {
    setItemId(null);
    dispatch(closeDialog('confirm'));
  }

  function handleNameEdit(data) {
    dispatch(openDialog('modify', data));
  }

  function handleDelete(uuid) {
    dispatch(deleteGallery([ uuid ]));
    dispatch(closeDialog('confirm'));
  }

  return (
    <div className={styles['content']}>
      <div className={styles['table']}>
        <Table columns={items}>
          <Column
            title="Изображение"
            alias="uuid"
            width="200"
            align="left"
          >
            {(value) => (
              <div className={styles['thumb']}>
                <Image src={`${process.env['REACT_APP_API_HOST']}/gallery/${value}?size=small`} />
              </div>
            )}
          </Column>
          <Column
            title="Название"
            align="left"
            width="200"
          >
            {(value) => (
              <div className={styles['name']} onClick={() => handleNameEdit(value)}>
                <div className={styles['text']}>
                  <Text type={Text.TYPE_COMMENT}>{ value['name'] || '---' }</Text>
                </div>
                <span className={cn(styles['icon'], 'far fa-edit')} />
              </div>
            )}
          </Column>
          <Column
            title="UUID"
            alias="uuid"
            align="left"
          >
            {(value) => <Text type={Text.TYPE_COMMENT}>{ value }</Text>}
          </Column>
          <Column
            align="right"
            width="45"
          >
            {(value) => <Actions onDelete={() => handleSetDeletedItem(value['uuid'])} />}
          </Column>
        </Table>
      </div>

      <Dialog name="name-modify">

      </Dialog>

      <Confirm
        message="Вы уверены, что хотите удалить изображение?"
        onConfirm={() => handleDelete(itemId)}
        onCancel={() => handleResetDeletedItem()}
      />
    </div>
  );
}

Types.propTypes = {};

Types.defaultProps = {};

export default Types;
