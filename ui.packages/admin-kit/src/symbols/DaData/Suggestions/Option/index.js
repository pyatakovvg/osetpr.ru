
import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Option({ value, onClick }) {
  function handleClick(event) {
    event.preventDefault();
    onClick();
  }

  const optionClassName = cn(styles['option'], {});

  return (
    <div className={optionClassName} onClick={handleClick}>
      <div className={styles['text']}>{ value }</div>
    </div>
  );
}

Option.propTypes = {
  value: types.oneOfType([types.object, types.string, types.number]),
  optionValue: types.string,
  isActive: types.bool,
  isDisabled: types.bool,
};

Option.defaultProps = {
  value: null,
  isActive: false,
  isDisabled: false,
};

export default Option;
