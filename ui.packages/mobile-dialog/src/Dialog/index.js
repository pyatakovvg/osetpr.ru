
import { closeDialog, selectIsOpen, selectName, selectData } from '@ui.packages/mobile-dialog';

import types from 'prop-types';
import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './defaults.module.scss';


function Dialog({ className, name, children, onClose }) {
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);

  const isOpen = useSelector(selectIsOpen);
  const activeName = useSelector(selectName);
  const data = useSelector(selectData);

  useEffect(function() {
    return () => {
      dispatch(closeDialog());
    }
  }, [])

  function handleCloseDialog() {
    dispatch(closeDialog());
    onClose && onClose(name);
  }

  function handleOutClick(event) {
    const { current: wrapperElement } = wrapperRef;

    const target = event.target;

    if (wrapperElement === target) {
      handleCloseDialog();
    }
  }

  const classNameDialog = cn(styles['dialog'], className);

  return isOpen && (name === activeName) && ReactDOM.createPortal((
    <div ref={wrapperRef} className={styles['wrapper']} onClick={handleOutClick}>
      <div className={classNameDialog}>
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
