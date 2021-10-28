
import { selectProducts } from '@ui.packages/order'
import { Cart, Image } from '@ui.packages/mobile-kit';

import types from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Mode from './Mode';

import styles from './default.module.scss';


function useGetProduct(uuid) {
  const products = useSelector(selectProducts);
  const product = products.find((item) => item[0] === uuid);
  return product ? product[1] : null;
}


export default function DefaultProduct({ uuid, externalId, title, modes, gallery, toCart }) {
  const orderProduct = useGetProduct(uuid);
  const [mode, setMode] = useState(modes.find((item) => item['isTarget']));

  function handleClick(mode) {
    setMode(mode);
  }

  function handleCart(product) {
    toCart && toCart(product);
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <span className={styles['name']}>{ title }</span>
        </div>
        <div className={styles['content']}>
          <Link className={styles['gallery']} to={process.env['PUBLIC_URL'] + '/products/' + externalId}>
            <Image src={gallery[0] ? process.env['PUBLIC_URL'] + '/gallery/' + gallery[0]['uuid'] : null} />
          </Link>
          <div className={styles['information']}>
            <div className={styles['modes']}>
              {modes.map((item) => {
                const orderMode = orderProduct ? orderProduct.find((mode) => mode[0] === item['uuid']) : null;
                return (
                  <Mode
                    key={item['uuid']}
                    {...item}
                    count={orderMode && orderMode[1]}
                    isActive={item['uuid'] === mode['uuid']}
                    onClick={() => handleClick(item)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles['cart']}>
          <Cart mode={Cart.mode.success} onClick={() => handleCart({ uuid: uuid, modeUuid: mode['uuid'] })} />
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
