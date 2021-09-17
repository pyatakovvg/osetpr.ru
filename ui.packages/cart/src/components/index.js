
import { restoreCartAction, selectIsOpen } from '@ui.packages/cart-widget';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Icon from './Icon';
import Content from './Content';

import styles from './defaults.module.scss';


function Widget() {
  if (/order/.test(location['pathname'])) {
    return null;
  }

  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);

  useEffect(function loadData() {
    dispatch(restoreCartAction());
  }, []);

  return (
    <div className={styles['wrapper']}>
      <Icon />
      {isOpen && <Content />}
    </div>
  );
}

export default Widget;
