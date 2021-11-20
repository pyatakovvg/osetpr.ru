
import { selectProduct } from '@modules/mobile-product';

import { selectOrder, updateOrder } from '@ui.packages/order';
import { Image, Header, Cart } from '@ui.packages/mobile-kit';
import { pushNotification } from '@ui.packages/mobile-notifications';


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Mode from './Mode';

import styles from './default.module.scss';


function useGetMaxModeCount(mode) {
  const order = useSelector(selectOrder);
  if ( ! order || ! mode) {
    return false;
  }
  const product = order['products'].find((product) => product['modeUuid'] === mode['uuid']);
  if ( ! product) {
    return false;
  }
  return product['number'] >= 10;
}

function Product() {
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const product = useSelector(selectProduct);

  const [mode, setMode] = useState(null);

  const isDisabled = useGetMaxModeCount(mode);

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
        externalId: product['externalId'],
        price: product['price'],
        title: product['title'],
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

  useEffect(() => {
    if (product) {
      setMode(product['modes'].find((item) => item['isTarget']));
    }
  }, [product]);

  function handleClick(mode) {
    setMode(mode);
  }

  if ( ! product || ! mode) {
    return null;
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['gallery']}>
          <Image src={product['gallery'][0] ? process.env['REACT_APP_API_HOST'] + '/gallery/' + product['gallery'][0]['uuid'] : null} />
        </div>
        <div className={styles['title']}>
          <Header>{ product['title'] }</Header>
        </div>
        <div className={styles['modes']}>
          {product['modes'].map((item) => {
            const product = order ? order['products'].find((product) => item['vendor'] === product['vendor']) : null;
            return (
              <Mode
                key={item['uuid']}
                count={product ? product['number'] : null}
                isActive={item['uuid'] === mode['uuid']}
                value={item['value']} price={item['price']} currency={item['currency']}
                onClick={() => handleClick(item)}
              />
            )
          })}
          <div className={styles['cart']}>
            <Cart
              mode={Cart.mode.success}
              disabled={isDisabled}
              onClick={() => handleToCart({
                externalId: product['externalId'],
                productUuid: product['uuid'],
                modeUuid: mode['uuid'],
                title: product['title'],
                gallery: product['gallery'],
                value: mode['value'],
                vendor: mode['vendor'],
                price: mode['price'],
                currency: mode['currency'],
              })}
            />
          </div>
        </div>
        <div className={styles['description']}>
          <div dangerouslySetInnerHTML={{ __html: product['description'] }} />
        </div>
      </div>
    </section>
  );
}

export default Product;
