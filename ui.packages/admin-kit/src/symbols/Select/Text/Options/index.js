
import types from 'prop-types';
import ReactDOM from 'react-dom';
import React, { forwardRef, useContext } from 'react';

import Option from './Option';

import Context from '../Context';

import styles from './default.module.scss';


function useCheckActive(option) {
  const { simple, value, optionKey } = useContext(Context);

  if (value instanceof Object) {
    return value[optionKey] === option[optionKey];
  }
  else if (simple) {
    return value === option[optionKey];
  }
  return value === option;
}

function useChangeElement() {
  let portalElement = document.querySelector('#selectOptionsPortal');
  if ( ! portalElement) {
    portalElement = document.createElement('div');
    portalElement.setAttribute('id', 'selectOptionsPortal');
    document.body.appendChild(portalElement);
  }
  return portalElement;
}

const Options = forwardRef(({ onClick }, ref) => {
  const portalElement = useChangeElement();
  const { optionValue, options } = useContext(Context);

  function handleOptionClick(option) {
    onClick(option);
  }

  return ReactDOM.createPortal(
    <div ref={ref} className={styles['wrapper']}>
      <div className={styles['options']}>
        {options.length
          ? options.map((option, index) => (
            <Option
              key={index}
              isActive={useCheckActive(option)}
              optionValue={optionValue}
              value={option}
              onClick={handleOptionClick.bind(null, option)}
            />
          ))
          : <p className={styles['empty']}>Нет данных</p>
        }
      </div>
    </div>
  , portalElement);
});

Options.propTypes = {
  value: types.oneOfType([types.string, types.number, types.object]),
  optionValue: types.string,
  options: types.array,
  onClick: types.func,
};

Options.defaultProps = {
  value: null,
  options: [],
  optionValue: 'value',
};

export default Options;
