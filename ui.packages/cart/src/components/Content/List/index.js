
import numeral from '@packages/numeral';
import { Mode } from '@ui.packages/types';
import { Button, Text } from '@ui.packages/admin-kit';
import {
  resetStateAction,

  closeCartAction,

  selectItems,
  selectAmount,
  selectInProcess,
} from '@ui.packages/cart-widget';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';

import styles from './defaults.module.scss';


function List({ onRemove, onReset }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const amounts = useSelector(selectAmount);
  const inProcess = useSelector(selectInProcess);

  useEffect(function() {
    return () => dispatch(resetStateAction());
  }, []);

  function handleGoToCart() {
    dispatch(closeCartAction());
    navigate(process.env['PUBLIC_URL'] + '/order');
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['list']}>
          {items.map((item, index) => (
            <Product
              key={item['uuid'] + '_' + index}
              {...item}
              onRemove={onRemove}
            />
          ))}
        </div>
        <div className={styles['info']}>
          {inProcess
           ? <Text>...расчитываем</Text>
           : <Text type={Text.TYPE_BODY}>На сумму: { amounts.map((amount) => numeral(amount[1]).format() + ' ' + amount[2])}</Text>}
        </div>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CONTEXT}
            disabled={inProcess}
            onClick={() => onReset()}
          >Очистить</Button>
          <Button
            mode={Mode.SUCCESS}
            disabled={inProcess}
            onClick={() => handleGoToCart()}
          >Оформить заказ</Button>
        </div>
      </div>
    </div>
  );
}

export default List;
