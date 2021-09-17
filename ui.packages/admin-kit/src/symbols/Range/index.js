
import types from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function getTrackBackground({ values, colors, min, max }) {
  const progress = values.slice(0).sort((a, b) => a - b).map(value => ((value - min) / (max - min)) * 100);
  const middle = progress.reduce((acc, point, index) => {
    return `${acc}, ${colors[index]} ${point}%, ${colors[index + 1]} ${point}%`;
  }, '');
  return `linear-gradient(to right, ${colors[0]} 0%${middle}, ${colors[colors.length - 1]} 100%)`;
}

function translate(element, x, index) {
  element.style.transform = `translate(${x}px)`;
  element.style.zIndex = index;
}

function translateThumbs(thumbs, offsets) {
  return thumbs.forEach((element, index) => translate(element, offsets[index]['x'], index));
}

function getThumbs(parent) {
  if (parent) {
    return Array.from(parent['children']).filter((element) => element.hasAttribute('aria-valuenow'));
  }
  return [];
}

function getCoords(element) {
  const rect = element.getBoundingClientRect();
  return {
    right: rect['right'],
    left: rect['left'],
    width: rect['width'],
  };
}

function getThumbDistance(thumbEl, clientX) {
  const { x, width } = thumbEl.getBoundingClientRect();
  return Math.abs(clientX - (x + width / 2));
}

function getClosestThumbIndex(thumbs, clientX) {
  let thumbIndex = 0
  let minThumbDistance = getThumbDistance(thumbs[0], clientX);
  for (let i = 1; i < thumbs.length; i++) {
    const thumbDistance = getThumbDistance(thumbs[i], clientX);
    if (thumbDistance < minThumbDistance) {
      minThumbDistance = thumbDistance;
      thumbIndex = i;
    }
  }
  return thumbIndex;
}

function getStepDecimals(step) {
  const decimals = step.toString().split('.')[1];
  return decimals ? decimals.length : 0;
}

function normalizeValue(value, index, min, max, step) {
  const BIG_NUM = 10e10;
  value = Math.round(value * BIG_NUM) / BIG_NUM;

  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }

  const remainder = Math.floor(value * BIG_NUM - min * BIG_NUM) % Math.floor(step * BIG_NUM);
  const closestLowerNum = Math.floor(value * BIG_NUM - Math.abs(remainder));
  const rounded = remainder === 0 ? value : closestLowerNum / BIG_NUM;
  const res = (Math.abs(remainder / BIG_NUM) < step / 2) ? rounded : rounded + step;
  const decimalPlaces = getStepDecimals(step);

  return parseFloat(res.toFixed(decimalPlaces));
}

function relativeValue(value, min, max) {
  return (value - min) / (max - min);
}


function Range({ step, value, min, max, prefix, onChange }) {
  console.log(value)
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRefs = value.map(() => useRef(null));

  const [ isHover, setHover ] = useState(false);
  const [ activeThumbIndex, setActiveThumbIndex ] = useState(-1);

  function getTargetIndex(event) {
    return getThumbs(trackRef['current']).findIndex((child) => child === event['target'] || child.contains(event['target']));
  }

  function getOffsets(trackElement) {
    const trackCoords = getCoords(trackElement);

    return thumbRefs.map((thumbRef, index) => {
      const thumbOffsets = { x: 0 };
      const thumbCoords = getCoords(thumbRef['current']);

      thumbOffsets['x'] = trackCoords['width'] * relativeValue(value[index], min, max) - thumbCoords['width'] / 2;

      return thumbOffsets;
    });
  }

  function handleThumbMove(clientX, index = null) {
    if (activeThumbIndex === -1 && index === null) return void 0;

    const trackCoords = getCoords(trackRef['current']);
    let newValue = ((clientX - trackCoords['left']) / trackCoords['width']) * (max - min) + min;
    const realIndex = index === null ? activeThumbIndex : index;

    if (Math.abs(value[realIndex] - newValue) >= step / 2) {

      if (newValue >= max) {
        newValue = max;
      }
      else if (newValue <= min) {
        newValue = min;
      }
    }

    if (value[realIndex + 1] && newValue > value[realIndex + 1]) {
      newValue = value[realIndex + 1];
    }
    else if (value[realIndex - 1] && newValue < value[realIndex - 1]) {
      newValue = value[realIndex - 1];
    }
    const newValues = value.slice(0);
    newValues[realIndex] = normalizeValue(newValue, realIndex, min, max, step);

    if (newValues[realIndex] !== value[realIndex]) {
      onChange && onChange(newValues);
    }
  }

  function handleMouseDown(event) {
    if (event['button'] !== 0) return void 0;

    event.preventDefault();
    event.stopPropagation();

    setHover(true);
    setActiveThumbIndex(getTargetIndex(event));
  }

  function handleTrackMouseDown(event) {
    if (event['button'] !== 0) return void 0;

    event.preventDefault();
    event.stopPropagation();

    const draggedThumbIndex = getClosestThumbIndex(thumbRefs.map((thumbRef) => thumbRef['current']), event['clientX']);

    thumbRefs[draggedThumbIndex]['current'].focus();
    setActiveThumbIndex(draggedThumbIndex);
    handleThumbMove(event['clientX'], draggedThumbIndex);
  }

  function handleMouseMove(event) {
    event.preventDefault();
    event.stopPropagation();

    handleThumbMove(event['clientX']);
  }

  function handleMouseUp(event) {
    event.preventDefault();

    setHover(false);
    setActiveThumbIndex(-1);
  }

  function handleMouseIn(event) {
    event.preventDefault();
    event.stopPropagation();

    setHover(true);
  }

  function handleMouseOut(event) {
    event.preventDefault();
    event.stopPropagation();

    if (activeThumbIndex === -1) {
      setHover(false);
    }
  }

  useEffect(function mountEvents() {
    const trackElement = trackRef['current'];

    translateThumbs(getThumbs(trackElement), getOffsets(trackElement));

    wrapperRef['current'].addEventListener('mouseover', handleMouseIn);
    wrapperRef['current'].addEventListener('mouseout', handleMouseOut);
    wrapperRef['current'].addEventListener('mousedown', handleTrackMouseDown);

    thumbRefs.map((thumbRef) => thumbRef['current'].addEventListener('mousedown', handleMouseDown));
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return function unmountEvents() {
      wrapperRef['current'] && wrapperRef['current'].removeEventListener('mouseover', handleMouseIn);
      wrapperRef['current'] && wrapperRef['current'].removeEventListener('mouseout', handleMouseOut);
      wrapperRef['current'] && wrapperRef['current'].removeEventListener('mousedown', handleTrackMouseDown);

      thumbRefs.map((thumbRef) => thumbRef['current'] && thumbRef['current'].removeEventListener('mousedown', handleMouseDown));
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseDown);
    }
  });

  return (
    <div ref={wrapperRef} className={styles['wrapper']}>
      <div className={cn(styles['container'], { [styles['container--hover']]: isHover })}>
        <div ref={trackRef} className={styles['track']} style={{ background: getTrackBackground({ values: value, colors: ['transparent', '#edf5ff', 'transparent'], min, max })}}>
          {value && (value.length > 0) && value.map((val, index) => (
            <div ref={thumbRefs[index]} key={index} className={styles['thumb']} aria-valuenow={value[index]}>
              <div className={styles['block']} />
              <div className={styles['arrow']} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles['tracker']} />
      <div className={styles['values']}>
        {value.map((value, index) => (
          <span key={index} className={styles['value']}>{ value + (prefix ? ' ' + prefix : '') }</span>
        ))}
      </div>
    </div>
  );
}

Range.propTypes = {
  prefix: types.string,
  step: types.number,
  min: types.number,
  max: types.number,
  value: types.array,
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
};

Range.defaultProps = {
  prefix: 'P',
  value: [],
  min: 0,
  max: 10,
  step: 1,
  onFocus: null,
  onChange: null,
  onBlur: null,
};

export default Range;
