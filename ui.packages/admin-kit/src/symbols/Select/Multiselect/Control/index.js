
import types from 'prop-types';
import React, { useState, useContext } from 'react';

import Process from './Process';
import ArrowControl from './ArrowControl';
import ResetControl from './ResetControl';

import Context from '../Context';

import cn from 'classnames';
import styles from './default.module.scss';


function Control({
  placeholder,
  onClick,
  onReset
}) {
  const [isHover, setHover] = useState(false);
  const { inProcess, isOpen, isDisabled, selectedObject, options, selectedValue, onTransformSelectedValue, transformValue } = useContext(Context);

  function handleSelectClick(event) {
    event.preventDefault();

    if ( ! isDisabled) {
      onClick();
    }
  }

  function handleResetClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if ( ! isDisabled) {
      onReset();
    }
  }

  const selectClassName = cn(styles['select'], {
    [styles['select--hover']]: isHover || isOpen,
    [styles['select--disabled']]: isDisabled,
  });

  const textColorClassName = cn(styles['text'], {
    [styles['text--disabled']]: isDisabled,
  });

  const selectedText = onTransformSelectedValue
    ? !! selectedObject && onTransformSelectedValue(selectedObject)
    : selectedValue;

  return (
    <div
      className={selectClassName}
      onClick={handleSelectClick}
      onMouseOut={() => ! isDisabled && setHover(false)}
      onMouseOver={() => ! isDisabled && setHover(true)}
    >
      <div className={styles['container']}>
        <div className={styles['content']}>
          <div className={styles['values']}>
            { !! selectedText.length && !! options.length
              ? (
                <span className={textColorClassName}>
                  {selectedText.map((item, index) => transformValue
                    ? transformValue(item)
                    : <span key={index} className={styles['item']}>{ item }</span>
                  )}
                </span>
              )
              : <span className={styles['placeholder']}>{ placeholder }</span>}
          </div>
        </div>
      </div>
      <div className={styles['controls']}>
        { inProcess && (
          <Process />
        )}
        { !! selectedValue && ! inProcess && (
          <ResetControl isHover={isHover || isOpen} onClick={handleResetClick} />
        )}
        <ArrowControl isOpen={isOpen} isHover={isHover || isOpen} />
      </div>
    </div>
  );
}

Control.propTypes = {
  onClick: types.func,
  onReset: types.func,
};

Control.defaultProps = {};

export default Control;
