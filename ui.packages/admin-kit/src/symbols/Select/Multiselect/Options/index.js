
import types from 'prop-types';
import ReactDOM from 'react-dom';
import React, { forwardRef, useContext } from 'react';

import Option from './Option';

import Context from '../Context';

import cn from 'classnames';
import styles from './default.module.scss';


function useCheckActive(option) {
  const { simple, value, optionKey } = useContext(Context);

  return value.some((item) => {
    if (item instanceof Object) {
      return item[optionKey] === option[optionKey];
    }
    else if (simple) {
      return item === option[optionKey];
    }
    return item === option;
  });
}

function useIndexOf(option, simple, value, optionKey) {
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      const item = value[key];
      if (item instanceof Object) {
        if (item[optionKey] === option[optionKey]) {
          return key;
        }
      }
      else if (simple) {
        if (item === option[optionKey]) {
          return key;
        }
      }
      else if (item === option) {
        return key;
      }
    }
  }
  return -1;
}

function getValue(option, simple, optionKey) {
  if (option instanceof Object) {
    return option[optionKey];
  }
  else if (simple) {
    return option[optionKey];
  }
  return option;
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


const Options = forwardRef(({ onClick, onApply, onReset }, ref) => {
  const portalElement = useChangeElement();
  const { optionValue, options, simple, value, optionKey } = useContext(Context);

  function handleOptionClick(option) {
    let newValue = [...value];
    const index = useIndexOf(option, simple, value, optionKey);

    if (index !== -1) {
      newValue.splice(index, 1);
    }
    else {
      newValue.push(getValue(option, simple, optionKey));
    }
    onClick(newValue);
  }

  return ReactDOM.createPortal(
    <div ref={ref} className={styles['wrapper']}>
      <div className={styles['options']}>
        {options.length
          ? (
            <div className={styles['content']}>
              {options.map((option, index) => (
                <Option
                  key={index}
                  isActive={useCheckActive(option)}
                  optionValue={optionValue}
                  value={option}
                  onClick={handleOptionClick.bind(null, option)}
                />
              ))}
              <div className={styles['controls']}>
                <span className={cn(styles['reset'], 'fas fa-times')} onClick={onReset} />
                <span className={cn(styles['apply'], 'fas fa-check')} onClick={onApply} />
              </div>
            </div>
          )
          : <p className={styles['empty']}>Нет данных</p>
        }
      </div>
    </div>
  , portalElement);
});

Options.propTypes = {
  value: types.array,
  optionValue: types.string,
  options: types.array,
  onClick: types.func,
  onReset: types.func,
  onApply: types.func,
};

Options.defaultProps = {
  value: null,
  options: [],
  optionValue: 'value',
};

export default Options;
