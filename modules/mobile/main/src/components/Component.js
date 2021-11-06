
import { selectProducts } from '@modules/mobile-main';

import { objectToQuery } from '@ui.packages/utils';
import { selectOrder, updateOrder } from '@ui.packages/order';
import { pushNotification } from '@ui.packages/mobile-notifications';
import { Dialog, openDialog, closeDialog } from '@ui.packages/mobile-dialog';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Filter from './Filter';
import Product from './Product';

import cn from 'classnames';
import styles from './default.module.scss';


function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const order = useSelector(selectOrder);
  const products = useSelector(selectProducts);

  async function handleToCart(product) {
    const orderProducts = order ? order['products'] : [];
    let products = [...orderProducts];
    const productIndex = products.findIndex((item) => item['modeUuid'] === product['modeUuid']);

    if (productIndex > -1) {
      products = [
        ...products.slice(0, productIndex),
        {
          ...products[productIndex],
          number: products[productIndex]['number'] + 1,
        },
        ...products.slice(productIndex + 1),
      ];
    }
    else {
      products.push({
        price: product['price'],
        title: product['title'],
        externalId: product['externalId'],
        productUuid: product['productUuid'],
        modeUuid: product['modeUuid'],
        value: product['value'],
        vendor: product['vendor'],
        gallery: product['gallery'],
        number: 1,
        currencyCode: product['currency']['code'],
      });
    }

    const isUpdated = await dispatch(updateOrder(window.localStorage.getItem('userUuid'), {
      uuid: order ? order['uuid'] : null,
      products,
    }));

    if (isUpdated) {
      dispatch(pushNotification({
        mode: 'success',
        title: 'Товар добавлен в корзину',
        content: `"${product['title']}" - ${product['price']} ${product['currency']['displayName']}`,
      }));
    }
  }

  function handleSetFilter(data) {
    dispatch(closeDialog('filter'));
    navigate(process.env['PUBLIC_URL'] + objectToQuery(data));
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['filter']} onClick={() => dispatch(openDialog('filter'))}>
          <span className={cn(styles['icon'], 'fas fa-filter')} />
          <div className={styles['text']}>Все</div>
          <span className={cn(styles['icon'], 'fas fa-chevron-right')} />
        </div>
        <div className={styles['products']}>
          {products.map((item) => (
            <Product key={item['uuid']} {...item} toCart={(data) => handleToCart(data)} />
          ))}
        </div>
      </div>

      <Dialog name={'filter'}>
        <Filter onChange={(data) => handleSetFilter(data)} />
      </Dialog>
    </section>
  );
}

export default Main;
