
import { Cart, Image } from '@ui.packages/mobile-kit';

import types from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Mode from './Mode';

import styles from './default.module.scss';


export default function DefaultProduct({ externalId, title, modes, gallery }) {
  const [mode, setMode] = useState(modes.find((item) => item['isTarget']));

  function handleClick(mode) {
    setMode(mode);
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <span className={styles['name']}>{ title }</span>
        </div>
        <div className={styles['content']}>
          <Link className={styles['gallery']} to={process.env['PUBLIC_URL'] + '/products/' + externalId}>
            <Image src={gallery[0] ? 'http://localhost:4000/gallery/' + gallery[0]['uuid'] : null} />
          </Link>
          <div className={styles['information']}>
            <div className={styles['modes']}>
              {modes.map((item) => (
                <Mode
                  key={item['uuid']}
                  {...item}
                  isActive={item['uuid'] === mode['uuid']}
                  onClick={() => handleClick(item)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles['cart']}>
          <Cart mode={Cart.mode.success} />
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
