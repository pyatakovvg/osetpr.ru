
import types from 'prop-types';
import React from 'react';

import Context from './context';

import cn from 'classnames';
import styles from './default.module.scss';


function RadioBox({ className, children, value, onChange }) {

  function handleClick(value) {
    onChange && onChange(value);
  }

  return (
    <Context.Provider value={{ value, onChange: handleClick }}>
      <div className={cn(styles['container'], className)}>
        {React.Children.map(children, (child, key) => {
          return child && React.cloneElement(child, { key, value });
        })}
      </div>
    </Context.Provider>
  );
}

RadioBox.propTypes = {
  disabled: types.bool,
  value: types.any,
  onChange: types.func,
};

RadioBox.defaultProps = {
  mode: 'default',
  disabled: false,
  value: false,
  label: null,
};

export default RadioBox;
export { default as Radio } from './RadioComponent';
