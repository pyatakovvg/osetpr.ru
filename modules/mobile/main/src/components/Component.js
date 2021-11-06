
import { selectProducts, selectFilter } from '@modules/mobile-main';

import { selectOrder, updateOrder } from '@ui.packages/order';
import { objectToQuery, queryToObject } from '@ui.packages/utils';
import { pushNotification } from '@ui.packages/mobile-notifications';
import { Dialog, openDialog, closeDialog } from '@ui.packages/mobile-dialog';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import Empty from './Empty';
import Filter from './Filter';
import Product from './Product';

import cn from 'classnames';
import styles from './default.module.scss';


function useGetCategories() {
  const location = useLocation();
  const query = queryToObject(location['search']);
  const filter = useSelector(selectFilter);
  let search = '';
  if (filter['categories']) {
    if (query['categoryId']) {
      if (query['categoryId'] instanceof Array) {
        for (let i in filter['categories']) {
          if (filter['categories'].hasOwnProperty(i)) {
            const item = filter['categories'][i];
            if (query['categoryId'].some((id) => id === item['id'])) {
              search += search ? ', ' + item['value'] : item['value'];
            }
          }
        }
      }
      else {
        const item = filter['categories'].find((item) => query['categoryId'] === item['id']);
        if (item) {
          search = item['value'];
        }
      }
    }
  }
  return search || 'Все';
}


function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedFilterName = useGetCategories();

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
          <div className={styles['text']}>
            <span className={styles['names']}>{ selectedFilterName }</span>
          </div>
          <span className={cn(styles['icon'], 'fas fa-chevron-right')} />
        </div>
        <div className={styles['products']}>
          { ! products.length && (
            <Empty />
          )}
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
