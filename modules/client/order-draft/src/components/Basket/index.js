
// import { selectInProcess } from '@ui.packages/order';
import { Confirm, openDialog, closeDialog } from '@ui.packages/client-dialog';
import { selectOrder, updateOrder } from '@ui.packages/order';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';
// import Attention from './Attention';

import styles from './default.module.scss';


function Basket() {
  const dispatch = useDispatch();

  const [productUuid, setProductUuid] = useState(null);

  const order = useSelector(selectOrder);
  // const inProcess = useSelector(selectInProcess);

  function handleChange(product) {
    let products = [...order['products']];
    const productIndex = products.findIndex((item) => item['uuid'] === product['uuid']);

    if (productIndex > -1) {
      products = [
        ...products.slice(0, productIndex),
        {
          ...products[productIndex],
          ...product,
        },
        ...products.slice(productIndex + 1),
      ];
    }

    dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order['uuid'],
      products,
    }));
  }

  function handleRemove(uuid) {
    setProductUuid(uuid);
    dispatch(openDialog('apply-remove'));
  }

  // function handleRemoveAll() {
  //   dispatch(openDialog('apply-remove-all'));
  // }

  async function handleRemoveApply() {
    let products = order['products'].filter((item) => item['uuid'] !== productUuid);
    setProductUuid(null);
    dispatch(closeDialog('apply-remove'));
    await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order['uuid'],
      products,
    }));

  }

  async function handleRemoveAllApply() {
    dispatch(closeDialog('apply-remove-all'));
    await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order['uuid'],
      products: [],
      address: null,
      paymentCode: null,
    }));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['content']}>
          {/*{order && (order['total'] < 500) && (*/}
          {/*  <div className={styles['attention']}>*/}
          {/*    <Attention />*/}
          {/*  </div>*/}
          {/*)}*/}
          {order && order['products'].map((product) => (
            <div className={styles['row']} key={product['vendor']}>
              <Product
                type={'order'}
                {...product}
                onChange={(data) => handleChange(data)}
                onRemove={(vendor) => handleRemove(vendor)}
              />
            </div>
          ))}
        </div>
      </div>

      <Confirm name={'apply-remove'} mode={'danger'} message={'Вы уверены, что хотите убрать товар из корзины?'} onApply={handleRemoveApply} />
      <Confirm name={'apply-remove-all'} message={'Вы уверены, что хотите очистить корзину?'} onApply={handleRemoveAllApply} />
    </div>
  );
}

export default Basket;
