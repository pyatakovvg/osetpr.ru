
import { selectOrder } from '@ui.packages/order';
import { Cart, Image } from '@ui.packages/mobile-kit';

import types from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Mode from './Mode';

import styles from './default.module.scss';


function useGetProduct() {
  const order = useSelector(selectOrder);
  return order ? order['products'] : [];
}

function useGetMaxModeCount(mode) {
  const products = useGetProduct();
  const product = products.find((product) => product['modeUuid'] === mode['uuid']);
  if ( ! product) {
    return false;
  }
  return product['number'] >= 10;
}


export default function DefaultProduct({ uuid, externalId, title, modes, gallery, toCart }) {
  const orderProducts = useGetProduct();
  const [mode, setMode] = useState(modes.find((item) => item['isTarget']));

  const isDisabled = useGetMaxModeCount(mode);

  function handleClick(mode) {
    setMode(mode);
  }

  function handleCart(product) {
    toCart && toCart(product);
  }

  const product = orderProducts.find((product) => product['modeUuid'] === modes[0]['uuid']);
  const count = product ? product['number'] : null;

  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <span className={styles['name']}>{ title }</span>
        </div>
        <div className={styles['content']}>
          <Link className={styles['gallery']} to={process.env['PUBLIC_URL'] + '/products/' + externalId}>
            <Image src={gallery[0] ? process.env['PUBLIC_URL'] + '/gallery/' + gallery[0]['uuid'] + '?size=middle' : null} />
          </Link>
          <div className={styles['information']}>
            <div className={styles['modes']}>
              { !! modes[0] && (
                <Mode
                  key={modes[0]['uuid']}
                  {...modes[0]}
                  count={count}
                  onClick={() => handleClick(modes[0])}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles['cart']}>
          <Cart
            mode={Cart.mode.success}
            disabled={isDisabled}
            onClick={() => handleCart({
              productUuid: uuid,
              modeUuid: mode['uuid'],
              title,
              gallery,
              value: mode['value'],
              vendor: mode['vendor'],
              price: mode['price'],
              currency: mode['currency'],
            })}
          />
        </div>
      </div>
    </div>
  );
}

DefaultProduct.propTypes = {
  externalId: types.string,
  name: types.string,
  modes: types.arrayOf(types.shape({

  })),
  price: types.number,
  currency: types.string,
};

DefaultProduct.defaultProps = {
  externalId: null,
  name: 'Пирог с мангольд и сыром',
  modes: [],
  price: 1200,
  currency: 'руб.',
};