
import { selectUuid, selectIsOpen, openCartAction, closeCartAction } from '@ui.packages/cart-widget';

import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from "./defaults.module.scss";


function Icon() {
  const dispatch = useDispatch();
  const uuids = useSelector(selectUuid);
  const isOpen = useSelector(selectIsOpen);

  function handleGoToOrder(event) {
    event.stopPropagation();
    if ( ! uuids.length) {
      return void 0;
    }
    isOpen
      ? dispatch(closeCartAction())
      : dispatch(openCartAction());
  }

  return (
    <span className={cn(styles['wrapper'], { [styles['is-open']]: isOpen })} onClick={handleGoToOrder}>
      <span className={cn(styles['icon'], 'fas fa-shopping-cart')} />
      { !! uuids.length && (
        <span className={cn(styles['arrow'], {
          'fas fa-chevron-down': ! isOpen,
          'fas fa-chevron-up': isOpen,
        })} />
      )}
      { !! uuids.length && (
        <span className={styles['has-inside']} />
      )}
    </span>
  );
}

export default Icon;
