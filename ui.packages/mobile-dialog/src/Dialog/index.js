
import { closeDialog, selectIsOpen, selectName, selectData } from '@ui.packages/mobile-dialog';

import types from 'prop-types';
import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './defaults.module.scss';


function Dialog({ className, name, children, onClose }) {
  const dispatch = useDispatch();

  const dialogRef = useRef(null);

  const isOpen = useSelector(selectIsOpen);
  const activeName = useSelector(selectName);
  const data = useSelector(selectData);

  useEffect(function() {
    return () => {
      dispatch(closeDialog());
    }
  }, []);

  function handleClickWrapperDialog(event) {
    const elementDialog = dialogRef['current'];

    if (elementDialog.isEqualNode(event['target'])) {
      handleCloseDialog();
    }
  }

  function handleCloseDialog() {
    dispatch(closeDialog());
    onClose && onClose(name);
  }

  if ( ! isOpen) {
    return null;
  }

  if (name !== activeName) {
    return null;
  }

  const classNameDialog = cn(styles['dialog'], className);

  return ReactDOM.createPortal((
    <div className={styles['wrapper']} onClick={(event) => handleClickWrapperDialog(event)}>
      <div ref={dialogRef} className={classNameDialog}>
        <span className={styles['close']} onClick={handleCloseDialog} />
        <div className={styles['content']}>
          { React.cloneElement(children, { data }) }
        </div>
      </div>
    </div>
  ), document.querySelector('#dialog'));
}

Dialog.propTypes = {
  className: types.string,
  isOpen: types.bool,
  title: types.string,
  name: types.string,
  actionDialogName: types.string,
  closeDialog: types.func,
  onClose: types.func,
};

Dialog.defaultProps = {
  className: null,
  isOpen: false,
  title: null,
  name: null,
};

export default Dialog;
