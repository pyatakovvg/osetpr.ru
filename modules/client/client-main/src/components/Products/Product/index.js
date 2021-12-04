
import { selectInProcess } from "@ui.packages/order";
import { Image, Header, Text, Cart } from '@ui.packages/client-kit';

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Mode from "./Mode";

import cn from 'classnames';
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


function Product({ uuid, externalId, title, originalName, gallery, modes, isAvailable, toCart }) {
  const [mode, setMode] = useState(modes.find((item) => item['isTarget']));

  const hasMaxCountMode = useGetMaxModeCount(mode);
  const isDisabled = ! isAvailable || hasMaxCountMode;

  const inProcess = useSelector(selectInProcess);

  function handleClick(item) {
    setMode(item);
  }

  function handleCart(product) {
    toCart && toCart(product);
  }

  return (
    <div className={styles['wrapper']}>
      <Link className={styles['gallery']} to={process.env['PUBLIC_URL'] + '/products/' + externalId}>
        <div className={styles['image']}>
          <Image className={cn({ [styles['gray']]: ! isAvailable })} src={gallery[0] ? process.env['REACT_APP_API_HOST'] + '/gallery/' + gallery[0]['uuid'] + '?size=middle' : null} />
        </div>
        {originalName && (
          <div className={styles['name']}>
            <Header level={3}>{ originalName }</Header>
          </div>
        )}
        { ! isAvailable && (
          <div className={styles['unavailable']}>
            <Text>Временно недоступен</Text>
          </div>
        )}
      </Link>
      <div className={styles['content']}>
        <div className={styles['title']}>
          { title }
        </div>
        <div className={styles['information']}>
          <div className={styles['modes']}>
            {modes.map((item) => (
              <Mode
                key={item['uuid']}
                {...item}
                count={3}
                disabled={ ! isAvailable}
                isActive={item['uuid'] === mode['uuid']}
                onClick={() => handleClick(item)}
              />
            ))}
          </div>
        </div>
        <div className={styles['cart']}>
          <Cart
            mode={Cart.mode.success}
            disabled={isDisabled || inProcess}
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

export default Product;
