
import { closeDialog } from '@ui.packages/client-dialog';

import { Mode } from '@ui.packages/types';
import { Button, Header } from "@ui.packages/client-kit";

import React from 'react';
import types from 'prop-types';
import { useDispatch } from 'react-redux';

import Dialog from '../Dialog';

import styles from './defaults.module.scss';


function ConfirmDialog({ name, title, mode, message, disabled, onApply, onCancel }) {
  const dispatch = useDispatch();

  function handleConfirm() {
    onApply && onApply();
  }

  function handleCancel() {
    onCancel && onCancel();
    dispatch(closeDialog());
  }

  return (
    <Dialog name={name} title={title} onClose={() => handleCancel()}>
      <div className={styles['confirm']}>
        <div className={styles['content']}>
          <Header level={3}>{ message }</Header>
        </div>
        <div className={styles['controls']}>
          <Button
            form={'context'}
            size={'small'}
            disabled={disabled}
            onClick={() => handleCancel()}
          >Отмена</Button>
          <Button
            mode={mode}
            size={'small'}
            disabled={disabled}
            onClick={() => handleConfirm()}
          >Подтверждаю</Button>
        </div>
      </div>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  name: types.string,
  title: types.string,
  message: types.string,
  mode: types.string,
  disabled: types.bool,
  onApply: types.func,
  onCancel: types.func,
};

ConfirmDialog.defaultProps = {
  name: 'confirm',
  title: null,
  mode: Mode.DANGER,
  message: null,
  disabled: false,
  onApply: null,
  onConfirm: null,
};

export default ConfirmDialog;
