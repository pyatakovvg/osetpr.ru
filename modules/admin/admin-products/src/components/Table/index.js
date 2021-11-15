
import { selectItems, selectInProcess, selectItemsInProcess, removeItem, getItems, updateItem } from '@modules/admin-products';

import numeral from '@packages/numeral';

import { Table, Column } from '@ui.packages/table';
import { Confirm, openDialog, closeDialog } from '@ui.packages/dialog';
import { Text, Header, Image, Actions, CheckBox } from '@ui.packages/admin-kit';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productUuid, setProductUuid] = useState(null);

  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);
  const itemsInProcess = useSelector(selectItemsInProcess);

  function handleCopyProduct() {}

  function handleEdit(uuid) {
    navigate(process.env['PUBLIC_URL'] + '/products/' + uuid);
  }

  function handleConfirmDestroyProduct(uuid) {
    setProductUuid(uuid);
    dispatch(openDialog('product-destroy'));
  }

  async function handleRemoveProduct() {
    await dispatch(removeItem(productUuid));
    await dispatch(getItems());
    dispatch(closeDialog('product-destroy'));
  }

  async function handleChangeUse(uuid, data) {
    await dispatch(updateItem(uuid, data));
    await dispatch(getItems());
  }

  async function handleChangeAvailable(uuid, data) {
    await dispatch(updateItem(uuid, data));
    await dispatch(getItems());
  }

  return (
    <div className={styles['wrapper']}>
      <Table columns={items}>
        <Column
          alias="gallery"
          width={140}
        >
          {(items) => items[0]
            ? <Image className={styles['image']} src={`${process.env['REACT_APP_API_HOST']}/gallery/${items[0]['uuid']}?size=small`} />
            : <span className={styles['not-image']}><i className="far fa-images" /></span>
          }
        </Column>
        <Column
          align={'left'}
        >{(value) => (
          <div className={styles['row']}>
            <div className={styles['title']}>
              <Header level={4}>{ value['title'] }{ value['originalName'] ? ' (' + value['originalName'] + ')' : null }</Header>
            </div>
            <div className={styles['category']}>
              <Text type={Text.TYPE_BODY}>"{ value['category'] ? value['category']['value'] : 'Все' }"</Text>
            </div>
            <div className={styles['products']}>
              {value['modes'].map((mode) => {
                return (
                  <div key={mode['uuid']} className={cn(styles['mode'], { [styles['not-use']]: ! mode['isUse'] })}>
                    <div className={styles['vendor']}>
                      <Text>[{ mode['vendor'] }]</Text>
                    </div>
                    <div className={styles['value']}>
                      <Text>{ mode['value'] }</Text>
                    </div>
                    <div className={styles['price']}>
                      <Text type={Text.TYPE_BODY}>{ numeral(Number(mode['price'])).format() } { mode['currency']['displayName'] }</Text>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}</Column>
        <Column
          title={'Видим'}
          width={60}
        >{({ uuid, isUse, updatedAt }) => (
          <CheckBox
            value={isUse}
            disabled={ !!~ itemsInProcess.indexOf(uuid)}
            onChange={(value) => handleChangeUse(uuid, { isUse: value, updatedAt })}
          />
        )}</Column>
        <Column
          title={'Наличие'}
          width={70}
        >{({ uuid, isAvailable, updatedAt }) => (
          <CheckBox
            value={isAvailable}
            disabled={ !!~ itemsInProcess.indexOf(uuid)}
            onChange={(value) => handleChangeAvailable(uuid, { isAvailable: value, updatedAt })}
          />
        )}</Column>
        <Column
          align="right"
          width="70"
        >
          {({ uuid }) => (
            <Actions
              disabled={inProcess || !!~ itemsInProcess.indexOf(uuid)}
              onCopy={() => handleCopyProduct(uuid)}
              onEdit={() => handleEdit(uuid)}
              onDelete={() => handleConfirmDestroyProduct(uuid)}
            />
          )}
        </Column>
      </Table>

      <Confirm
        name={'product-destroy'}
        message={'Вы точно уверены что хотите удалить продукт?'}
        onConfirm={() => handleRemoveProduct()}
        onCancel={() => setProductUuid(null)}
      />
    </div>
  );
}

ProductList.propTypes = {};

ProductList.defaultProps = {};

export default ProductList;
