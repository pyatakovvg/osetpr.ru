
import { InputField, CheckBoxField } from '@ui.packages/admin-kit';

import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function ModeField({ field, disabled, onRemove }) {
  const classNameRemoveAttr = cn(styles['attr__remove'], 'far fa-trash-alt');

  function handleRemove() {
    onRemove && onRemove();
  }

  return (
    <div className={styles['attr']}>
      <div className={styles['attr__value']}>
        <InputField
          require
          name={`${field}.code`}
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__value']}>
        <InputField
          require
          name={`${field}.displayName`}
          disabled={disabled}
        />
      </div>
      <div>
        <CheckBoxField name={`${field}.isUse`} />
      </div>
      <div className={styles['attr__controls']}>
        <span className={classNameRemoveAttr} onClick={() => handleRemove()} />
      </div>
    </div>
  );
}

ModeField.propTypes = {
  field: types.string,
  onRemove: types.func,
};

ModeField.defaultProps = {
  field: '',
};

export default ModeField;
