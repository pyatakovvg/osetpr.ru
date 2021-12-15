
import { closeDialog, selectIsOpen, selectName, selectData } from '@ui.packages/admin-dialog';

import { Header } from '@ui.packages/admin-kit';

import types from 'prop-types';
import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './defaults.module.scss';


function Dialog({ className, title, name, children, onClose }) {
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);

  const isOpen = useSelector(selectIsOpen);
  const activeName = useSelector(selectName);
  const data = useSelector(selectData);

  useEffect(() => {
    function handleKeyPress(event) {
      if (event['keyCode'] === 27) {
        dispatch(closeDialog());
      }
    }
    document.body.addEventListener('keyup', handleKeyPress);
    return () => {
      document.body.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

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

  const classNameCloseDialog = cn(styles['close'], 'fas fa-times');
  const classNameDialog = cn(styles['dialog'], className);

  return isOpen && (name === activeName) && ReactDOM.createPortal((
    <div ref={wrapperRef} className={styles['wrapper']} onClick={handleOutClick}>
      <div className={classNameDialog}>
        <span className={classNameCloseDialog} onClick={handleCloseDialog} />
        {title && (
          <div className={styles['header']}>
            <Header level={3}>{ title }</Header>
          </div>
        )}
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
