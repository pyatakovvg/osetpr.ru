
import { Cart, Image } from '@ui.packages/mobile-kit';

import types from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Mode from './Mode';

import styles from './default.module.scss';


function useGetMaxModeCount(products) {
  if ( ! products.length) {
    return false;
  }
  const product = products.find((product) => product['modeUuid'] === mode['uuid']);
  if ( ! product) {
    return false;
  }
  return product['number'] >= 10;
}


export default function DefaultProduct({ uuid, externalId, title, modes, gallery, isAvailable, toCart }) {
  const [mode, setMode] = useState(modes.find((item) => item['isTarget']));

  const hasMaxCountMode = useGetMaxModeCount(mode);
  const isDisabled = ! isAvailable || hasMaxCountMode;

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
            <Image src={gallery[0] ? process.env['REACT_APP_API_HOST'] + '/gallery/' + gallery[0]['uuid'] + '?size=middle' : null} />
          </Link>
          <div className={styles['information']}>
            <div className={styles['modes']}>
              {modes.map((item) => (
                <Mode
                  key={item['uuid']}
                  {...item}
                  disabled={ ! isAvailable}
                  isActive={item['uuid'] === mode['uuid']}
                  onClick={() => handleClick(item)}
                />
              ))}
            </div>
            { ! isAvailable && (
              <span className={styles['unavailable']}>Временно недоступен</span>
            )}
          </div>
        </div>
        <div className={styles['cart']}>
          <Cart
            mode={Cart.mode.success}
            disabled={isDisabled}
            onClick={() => handleCart({
              productUuid: uuid,
              externalId,
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
