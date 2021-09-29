
import { getProducts, selectInProductsProcess } from '@modules/order-order';

import { useMount } from '@ui.packages/hoc';

import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import Spinner from './Spinner';
import Products from './Products';

import styles from './default.module.scss';


function Dialog({ data, onChange }) {
  const dispatch = useDispatch();
  const inProcess = useSelector(selectInProductsProcess);

  useMount(() => {
    dispatch(getProducts());
  });

  function handleChange(data) {
    onChange(data);
  }

  return (
    <div className={styles['wrapper']}>
      {inProcess
        ? <Spinner />
        : <Products data={data} onChange={(data) => handleChange(data)} />}
    </div>
  );
}

Dialog.defaultProps = {
  data: [],
};

export default Dialog;
