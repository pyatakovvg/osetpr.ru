
import { selectProducts } from '@modules/client-main';

import { selectOrder, updateOrder } from "@ui.packages/order";
import { pushNotification } from "@ui.packages/mobile-notifications";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Empty from "./Empty";
import Product from "./Product";

import styles from './default.module.scss';


function Products() {
  const dispatch = useDispatch();

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
        imageUuid: product['gallery'].length ? product['gallery'][0]['uuid'] : null,
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

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        { ! products.length && (
          <Empty />
        )}
        {products.map((item) => (
          <div className={styles['product']} key={item['uuid']}>
            <Product {...item} toCart={handleToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
