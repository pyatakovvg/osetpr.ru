
import types from 'prop-types';
import React, { useContext } from 'react';

import Context from './context';

import cn from "classnames";
import styles from "./default.module.scss";


function RadioOption({ className, label, name, temp, disabled, children }) {
  const { value, onChange } = useContext(Context);

  function handleChange() {
    if (disabled) {
      return void 0;
    }
    onChange && onChange(name);
  }

  const classNameWrapper = cn(className, styles['wrapper'], {
    [styles['disabled']]: disabled,
  });
  const classNameRadio = cn(styles['radio'], {
    [styles['radio--disabled']]: disabled,
  });
  const isSelected = (name === value);
  return children
    ? (
        React.Children.map(children, child => {
          return React.cloneElement(child, {
            selected: name === value,
            onClick: handleChange.bind(null, name)
          })
        })
      )
    : (
        <span className={classNameWrapper} onClick={handleChange}>
          <span className={classNameRadio}>
            {isSelected && <span className={cn(styles['radio__marker'])} />}
          </span>
          {label && <label className={styles['label']}>{ label }</label>}
          {temp && <span className={styles['temp']}>{ temp }</span>}
        </span>
      );
}

RadioOption.propTypes = {
  label: types.string,
  mode: types.string,
  disabled: types.bool,
  className: types.string,
  value: types.any,
};

RadioOption.defaultProps = {
  label: '',
  mode: '',
  disabled: false,
  className: '',
  name: '',
  value: '',
};

export default RadioOption;
