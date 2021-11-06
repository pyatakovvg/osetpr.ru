
import numeral from '@packages/numeral';

import { InputField, Text } from '@ui.packages/admin-kit';

import React  from "react";

import styles from './default.module.scss';


function Product({ field, ...product }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['title']}>
        <Text>{ product['title'] }</Text>
      </div>
      <div className={styles['vendor']}>
        <Text>{ product['vendor'] }</Text>
      </div>
      <div className={styles['value']}>
        <Text>{ product['value'] }</Text>
      </div>
      <div className={styles['price']}>
        <Text type={Text.TYPE_BODY}>{ numeral(product['price']).format() } { product['currency']['displayName'] }</Text>
      </div>
      <div className={styles['number']}>
        <InputField name={`${field}.number`} />
      </div>
    </div>
  );
}

export default Product;
