
import { createCancelToken } from '@ui.packages/request';
import { openDialog, closeDialog, Confirm } from '@ui.packages/dialog';
import {
  closeCartAction,

  selectUuid,
  selectIsOpen,
  selectInProcess,

  getCart,

  resetCartAction,
  removeProductFromCartAction,
} from '@ui.packages/cart-widget';

import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';

import List from './List';
import Spinner from './Spinner';

import styles from './defaults.module.scss';


function Content() {
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);

  const [isInit, setInit] = useState(false);
  const [isDialog, setDialog] = useState(false);
  const [removedUuid, setRemovedUuid] = useState(null);

  const uuids = useSelector(selectUuid);
  const isOpen = useSelector(selectIsOpen);
  const inProcess = useSelector(selectInProcess);


  function handleClose(event) {
    if (isDialog) {
      return;
    }
    const { current: wrapperElement } = wrapperRef;
    const target = event['target'];
    if (wrapperElement && target) {
      if ( ! wrapperElement.contains(target)) {
        dispatch(closeCartAction());
      }
    }
  }

  useEffect(function() {
    document.querySelector('#scroller').addEventListener('scroll', handleClose)
    document.addEventListener('click', handleClose);
    return () => {
      document.querySelector('#scroller').removeEventListener('scroll', handleClose);
      document.removeEventListener('click', handleClose);
    };
  }, [isDialog]);

  useEffect(function() {
    const token = createCancelToken();
    (async () => {
      await dispatch(getCart(uuids, token));
      setInit(true);
    })();

    return () => {
      token.cancel();
      setInit(false);
    };
  }, [isOpen]);

  useEffect(function() {
    if (isInit) {
      const token = createCancelToken();
      if ( !! uuids.length) {
        dispatch(getCart(uuids, token));
      }
      else {
        dispatch(closeCartAction());
      }
      return () => {
        token.cancel();
      };
    }
  }, [uuids]);

  function handleConfirmRemove() {
    setDialog(false);
    setRemovedUuid(null);
    dispatch(closeDialog('remove-from-cart'));
    dispatch(removeProductFromCartAction(removedUuid));
  }

  function handleRemoveProductFromCart(payload) {
    setRemovedUuid(payload);
    setDialog(true);
    dispatch(openDialog('remove-from-cart'));
  }

  function handleCancelRemove() {
    setDialog(false);
    setRemovedUuid(null);
    dispatch(closeDialog('remove-from-cart'));
  }

  function handleResetCart() {
    setDialog(true);
    dispatch(openDialog('reset-from-cart'));
  }

  function handleConfirmReset() {
    setDialog(false);
    dispatch(resetCartAction());
    dispatch(closeCartAction());
    dispatch(closeDialog('reset-from-cart'));
  }

  function handleCancelReset() {
    setDialog(false);
    dispatch(closeDialog('reset-from-cart'));
  }

  return (
    <div ref={wrapperRef} className={styles['wrapper']}>
      <div className={styles['content']}>
        {( ! isInit && inProcess)
          ? <Spinner />
          : (
            <List
              onReset={() => handleResetCart()}
              onRemove={(payload) => handleRemoveProductFromCart(payload)}
            />
          )}
      </div>

      <Confirm
        name={'remove-from-cart'}
        message={'Вы точно хотите удалить товар из корзины?'}
        onConfirm={() => handleConfirmRemove()}
        onCancel={() => handleCancelRemove()}
      />

      <Confirm
        name={'reset-from-cart'}
        message={'Вы точно хотите очистить корзину?'}
        onConfirm={() => handleConfirmReset()}
        onCancel={() => handleCancelReset()}
      />
    </div>
  );
}

export default Content;
