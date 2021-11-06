
import { closeDialog, Window } from '@ui.packages/mobile-dialog';

import React from 'react';
import types from 'prop-types';
import { useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './defaults.module.scss';


function Confirm({ mode, message, onApply, ...props }) {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeDialog(props['name']));
  }

  function handleApply() {
    onApply && onApply();
  }

  const classNameButtonApply = cn(styles['button-apply'], {
    [styles['mode--success']]: mode === 'success',
  });

  return (
    <Window {...props}>
      <div className={styles['wrapper']}>
        <div className={styles['content']}>
          <p className={styles['message']}>{ message }</p>
        </div>
        <div className={styles['controls']}>
          <button className={styles['button-cancel']} onClick={handleClose}>Отменить</button>
          <button className={classNameButtonApply} onClick={handleApply}>Подтвердить</button>
        </div>
      </div>
    </Window>
  )
}

Confirm.propTypes = {
  className: types.string,
  isOpen: types.bool,
  title: types.string,
  name: types.string,
  actionDialogName: types.string,
  closeDialog: types.func,
  onClose: types.func,
};

Confirm.defaultProps = {
  className: null,
  isOpen: false,
  title: null,
  name: null,
};

export default Confirm;
