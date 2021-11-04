
import { Cart, Image } from '@ui.packages/mobile-kit';
import { selectOrder, selectModesInProcess } from '@ui.packages/order';

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


export default function DefaultProduct({ uuid, externalId, title, modes, gallery, toCart }) {
  const orderProducts = useGetProduct();
  const [mode, setMode] = useState(modes.find((item) => item['isTarget']));

  const modesInProcess = useSelector(selectModesInProcess);

  function handleClick(mode) {
    setMode(mode);
  }

  function handleCart(product) {
    toCart && toCart(product);
  }

console.log(modesInProcess)
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
              {modes.map((item) => {
                const product = orderProducts.find((product) => product['modeUuid'] === item['uuid']);
                const count = product ? product['number'] : null;
                return (
                  <Mode
                    key={item['uuid']}
                    {...item}
                    count={count}
                    isActive={item['uuid'] === mode['uuid']}
                    onClick={() => handleClick(item)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles['cart']}>
          <Cart mode={Cart.mode.success} onClick={() => handleCart({
            productUuid: uuid,
            modeUuid: mode['uuid'],
            title,
            gallery,
            value: mode['value'],
            vendor: mode['vendor'],
            price: mode['price'],
            currency: mode['currency'],
          })} />
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
