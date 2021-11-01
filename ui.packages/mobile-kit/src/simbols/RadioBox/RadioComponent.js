
import types from 'prop-types';
import React, { useContext } from 'react';

import Context from './context';

import cn from "classnames";
import styles from "./default.module.scss";


const INFO_MODE = 'info';
const DANGER_MODE = 'danger';
const PRIMARY_MODE = 'primary';
const WARNING_MODE = 'warning';
const SUCCESS_MODE = 'success';


function RadioOption({ className, label, name, mode, disabled, children }) {
  const { value, onChange } = useContext(Context);

  function handleChange() {
    onChange(name);
  }

  const classNameWrapper = cn(className, styles['wrapper']);
  const classNameRadio = cn(styles['radio'], {
    [styles['radio--primary']]: mode === PRIMARY_MODE,
    [styles['radio--success']]: mode === SUCCESS_MODE,
    [styles['radio--info']]: mode === INFO_MODE,
    [styles['radio--danger']]: mode === DANGER_MODE,
    [styles['radio--warning']]: mode === WARNING_MODE,
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
