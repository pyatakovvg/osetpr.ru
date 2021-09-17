
import types from 'prop-types';
import React, { useContext } from 'react';

import Context from '../../Context';

import cn from 'classnames';
import styles from './default.module.scss';


function useGetValue(value, optionValue) {
  if (value instanceof Object) {
    return value[optionValue];
  }
  return value;
}

function Option({ value, optionValue, isActive, onClick }) {
  const optionText = useGetValue(value, optionValue);
  const { OptionTemplate } = useContext(Context);

  function handleClick(event) {
    event.preventDefault();

    if ( ! isActive) {
      onClick();
    }
  }

  const optionClassName = cn(styles['option'], {
    [styles['option--active']]: isActive,
  });

  return (
    <div className={optionClassName} onClick={handleClick}>
      { !! OptionTemplate
       ? <OptionTemplate { ...value } />
       : <div className={styles['text']}>{ optionText }</div>}
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
