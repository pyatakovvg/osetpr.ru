
import { Dialog, openDialog, closeDialog } from '@ui.packages/dialog';
import { Header, Button, Text } from '@ui.packages/admin-kit';

import React  from "react";
import { useDispatch } from 'react-redux';

import Product from './Product';
import ProductsDialog from './Dialog';

import cn from 'classnames';
import styles from './default.module.scss';


function Products({ fields }) {
  const dispatch = useDispatch();

  function handleAdd() {
    const products = fields.getAll();
    dispatch(openDialog('products', products));
  }

  function handleRemoveProduct(index) {
    fields.remove(index);
  }

  function handleChange(data) {
    dispatch(closeDialog('products'));
    fields.removeAll();
    data.forEach((item) => {
      fields.push({
        currency: item['currency'],
        number: item['number'],
        price: item['price'],
        productUuid: item['productUuid'],
        title: item['title'],
        value: item['value'],
        vendor: item['vendor'],
      });
    });
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header>Продукты</Header>
      </div>
      <div className={styles['content']}>
        { ! fields.length && <Text>Нет добавленных продуктов</Text>}
        {fields.map((field, index) => {
          const product = fields.get(index);
          return (
            <div key={index} className={styles['product']}>
              <div className={styles['product__content']}>
                <Product field={field} {...product} />
              </div>
              <div className={styles['product__control']}>
                <span className={cn(styles['icon'], 'fas fa-trash-alt')} onClick={() => handleRemoveProduct(index)} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles['controls']}>
        <Button
          mode={Button.MODE_PRIMARY}
          onClick={() => handleAdd()}
        >Добавить</Button>
      </div>

      <Dialog name={'products'}>
        <ProductsDialog onChange={(data) => handleChange(data)} />
      </Dialog>
    </div>
  );
}

export default Products;
