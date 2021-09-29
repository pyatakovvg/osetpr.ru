
import { selectProducts } from '@modules/order-order';

import { Button } from '@ui.packages/admin-kit';

import React, { useState } from "react";
import { useSelector } from 'react-redux';

import Product from './Product';

import styles from './default.module.scss';


function Dialog({ data, onChange }) {
  const products = useSelector(selectProducts);

  const [items, setItems] = useState(data);

  function handleAdd(items) {
    onChange(items);
  }

  function handleChange(mode) {
    const index = items.findIndex((item) => item['vendor'] === mode['vendor']);
    if (index < 0) {
      setItems([...items, mode]);
    }
    else {
      setItems([
        ...items.slice(0, index),
        ...items.slice(index + 1 )
      ]);
    }
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        {products.map((item) => {
          return (
            <Product key={item['uuid']} {...item} items={items} onChange={(mode) => handleChange(mode)} />
          );
        })}
      </div>
      <div className={styles['controls']}>
        <Button
          mode={Button.MODE_PRIMARY}
          onClick={() => handleAdd(items)}
        >Добавить</Button>
      </div>
    </div>
  );
}

export default Dialog;
