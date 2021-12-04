
import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Checkbox({ className, value, children, disabled, onChange }) {
  const classNameWrapper = useMemo(() => cn(styles['wrapper'], {
    [styles['disabled']]: disabled,
  }), [className, disabled]);
  const classNameMarker = useMemo(() => cn(styles['marker'], "fas fa-check"), []);

  function handleClick(value) {
    if (disabled) {
      return void 0;
    }
    onChange && onChange( ! value);
  }

  return (
    <div className={classNameWrapper} onClick={() => handleClick(value)}>
      <div className={styles['checkbox']}>
        {value && <span className={classNameMarker} />}
      </div>
      <div className={styles['label']}>
        { children }
      </div>
    </div>
  );
}

Checkbox.propTypes = {
  disabled: types.bool,
  value: types.any,
  onChange: types.func,
};

Checkbox.defaultProps = {
  mode: 'default',
  disabled: false,
  value: false,
  label: null,
};

export default Checkbox;
