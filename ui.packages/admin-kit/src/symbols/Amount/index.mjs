
import types from 'prop-types';
import React, { useRef, useEffect } from 'react';

import styles from './default.module.scss';


function Amount({ value, onFocus, onBlur, onChange }) {
  const scrollerRef = useRef(null);
  const minProgressRef = useRef(null);
  const maxProgressRef = useRef(null);

  let isStartMinMove = false;
  let isStartMaxMove = false;

  let minValue = 0;
  let maxValue = 0;

  useEffect(() => {

    function handleStop() {
      isStartMinMove = false;
      isStartMaxMove = false;
      onChange && onChange({ min: minValue, max: maxValue });
      onBlur && onBlur();
    }

    function handleMinMove(event) {
      if (isStartMinMove) {
        const { clientX } = event;
        const { current: scroller } = scrollerRef;
        const { current: minProgress } = minProgressRef;
        const { current: maxProgress } = maxProgressRef;

        const scrollerRect = scroller.getBoundingClientRect();
        const minProgressRect = minProgress.getBoundingClientRect();
        const maxProgressRect = maxProgress.getBoundingClientRect();

        const minX = clientX - scrollerRect['left'];

        if (minX >= 0 && minX <= (maxProgressRect['left'] - scrollerRect['left'] - minProgressRect['width'])) {
          minProgress.style['left'] = minX + 'px';
          this.minValue = minX;
        }
      }

      if (isStartMaxMove) {
        const { clientX } = event;    const {  } = this.props;

        const { current: scroller } = scrollerRef;
        const { current: minProgress } = minProgressRef;
        const { current: maxProgress } = maxProgressRef;

        const scrollerRect = scroller.getBoundingClientRect();
        const minProgressRect = minProgress.getBoundingClientRect();
        const maxProgressRect = maxProgress.getBoundingClientRect();

        const maxX = clientX - scrollerRect['left'];

        if (maxX >= (minProgressRect['left'] - scrollerRect['left'] + minProgressRect['width'] - 1) && maxX <= scrollerRect['width'] - maxProgressRect['width']) {
          maxProgress.style['left'] = maxX + 'px';
          this.maxValue = maxX;
        }
      }
    }

    document.body.addEventListener('mousemove', handleMinMove, false);
    document.body.addEventListener('mouseup', handleStop, false);

    return () => {
      document.body.removeEventListener('mousemove', handleMinMove, false);
      document.body.removeEventListener('mouseup', handleStop, false);
    };
  });

  function handleMinStart(event) {
    isStartMinMove = true;
    onFocus && onFocus();
    event.preventDefault();
  }

  function handleMaxStart(event) {
    isStartMaxMove = true;
    onFocus && onFocus();
    event.preventDefault();
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['values']}>
        <span className={styles['min']}>{ value['min'] }</span>
        <span className={styles['max']}>{ value['max'] }</span>
      </div>
      <div ref={scrollerRef} className={styles['scroller']}>
        <span ref={minProgressRef} className={styles['min-progress']} onMouseDown={handleMinStart} onMouseUp={handleStop} />
        <span ref={maxProgressRef} className={styles['max-progress']} onMouseDown={handleMaxStart} onMouseUp={handleStop} />
      </div>
    </div>
  );
}

Amount.propTypes = {
  min: types.number,
  max: types.number,
  value: types.object,
  disabled: types.bool,
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
};

Amount.defaultProps = {
  min: 0,
  max: 1000,
  value: {
    min: 0,
    max: 1000,
  },
  disabled: false,
};

export default Amount;
