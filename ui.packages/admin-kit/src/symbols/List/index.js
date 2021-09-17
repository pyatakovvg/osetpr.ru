
import { Mode } from '@ui.packages/types';

import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function List({ options, optionKey, optionValue, value, onChange }) {

  function handleOnClick(event, id) {
    event.stopPropagation();
    const index = value.indexOf(id);
    if (index > -1) {
      onChange([...value.slice(0, index), ...value.slice(index + 1)]);
    }
    else {
      onChange([...value, id]);
    }

    console.log('click');
  }

  function handleDoubleClick(event) {
    event.stopPropagation();
    console.log('double click')
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        {options.map((option, index) => (
          <div
            key={index}
            className={cn(styles['option'], {
              [styles['active']]: !!~ value.indexOf(option[optionKey]),
            })}
            onClick={(e) => handleOnClick(e, option[optionKey])}
            onDoubleClick={(e) => handleDoubleClick(e)}
          >
            <span className={cn(styles['marker'], 'fas fa-check')} />
            <div className={styles['option__text']}>{ option[optionValue] }</div>
          </div>
        ))}
      </div>
    </div>
  );
}

List.propTypes = {
  className: types.string,
  mode: types.oneOf([Mode.DEFAULT, Mode.DANGER, Mode.INFO, Mode.SUCCESS, Mode.PRIMARY, Mode.WARNING]),
  options: types.array,
  optionKey: types.string,
  optionValue: types.string,
  value: types.any,
  disabled: types.bool,
  onChange: types.func,
  onInput: types.func,
  onFocus: types.func,
  onBlur: types.func,
};

List.defaultProps = {
  className: '',
  mode: Mode.DEFAULT,
  optionKey: 'id',
  optionValue: 'value',
  value: '',
  disabled: false,
  onChange: null,
  onInput: null,
  onFocus: null,
  onBlur: null,
};

export default List;
