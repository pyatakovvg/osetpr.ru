
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function Actions({ disabled, onEdit, onDelete, onCopy }) {
  return (
    <div className={styles['block']}>
      {onEdit && <span className={cn(styles['action'], styles['action--edit'], 'fas fa-edit', { [styles['disabled']]: disabled })} onClick={ ! disabled ? onEdit : undefined} />}
      {onCopy && <span className={cn(styles['action'], styles['action--copy'], 'far fa-copy', { [styles['disabled']]: disabled })} onClick={ ! disabled ? onCopy : undefined} />}
      {onDelete && <span className={cn(styles['action'], styles['action--delete'], 'far fa-trash-alt', { [styles['disabled']]: disabled })} onClick={ ! disabled ? onDelete : undefined} />}
    </div>
  );
}

Actions.propTypes = {
  disabled: types.bool,
  onEdit: types.func,
  onCopy: types.func,
  onDelete: types.func,
};

Actions.defaultProps = {
  disabled: false,
  onEdit: null,
  onCopy: null,
  onDelete: null,
};

export default Actions;
