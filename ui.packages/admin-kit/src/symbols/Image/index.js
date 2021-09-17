
import types from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const COVER_SIZE = 'cover';

const BOTH_DIRECTION = 'both';
const PORTRAIT_DIRECTION = 'portrait';
const LANDSCAPE_DIRECTION = 'landscape';


function getRation(el) {
  if ( ! el) {
    return 0;
  }
  const RECT = el.getBoundingClientRect();
  return RECT['height'] / RECT['width'];
}

function getDirection(img, container) {
  const imageRatio = getRation(img);
  const containerRatio = getRation(container);

  if (imageRatio < containerRatio) {
    return LANDSCAPE_DIRECTION;
  }
  else if (imageRatio > containerRatio) {
    return PORTRAIT_DIRECTION;
  }
  return BOTH_DIRECTION;
}

function setProportionalImageSize(img, container) {
  const direction = getDirection(img, container);
  const containerRECT = container.getBoundingClientRect();

  if (direction === LANDSCAPE_DIRECTION) {
    img.width = containerRECT['width'];
  }
  else if (direction === PORTRAIT_DIRECTION) {
    img.height = containerRECT['height'];
  }
  else {
    img.width = containerRECT['width'];
    img.height = containerRECT['height'];
  }
}

function setCoverImageSize(img, container) {
  const direction = getDirection(img, container);
  const containerRECT = container.getBoundingClientRect();
  
  if (direction === LANDSCAPE_DIRECTION) {
    img.height = containerRECT['height'];
  }
  else if (direction === PORTRAIT_DIRECTION) {
    img.width = containerRECT['width'];
  }
  else {
    img.width = containerRECT['width'];
    img.height = containerRECT['height'];
  }
}


export default function Image({ className, src, size, isResize }) {
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);

  const [isError, setError] = useState(false);
  const [isLoadingState, setLoadingState] = useState(true);

  function calculateProportions() {
    const { current: imageElement } = imageRef;
    const { current: wrapperElement } = wrapperRef;

    switch (size) {
      case COVER_SIZE: setCoverImageSize(imageElement, wrapperElement); break;
      default: setProportionalImageSize(imageElement, wrapperElement);
    }
  }

  function handleError() {
    setError(true);
    setLoadingState(false);
  }

  function handleLoaded() {
    calculateProportions();
    setError(false);
    setLoadingState(false);
  }

  function handleResize() {
    calculateProportions();
  }

  useEffect(() => {
    if (isResize) {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (isResize) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [src, size]);

  const wrapperClassName = cn(styles['wrapper'], className);

  return (
    <div className={wrapperClassName}>
      {src && (
        <div ref={wrapperRef} className={styles['image']}>
          <img ref={imageRef} src={src} alt="" onLoad={() => handleLoaded()} onError={() => handleError()} />
        </div>
      )}
      {src && isLoadingState && (
        <div className={styles['loading']}>
          <span className={cn(styles['icon'], styles['animation'], 'fas fa-circle-notch')} />
        </div>
      )}
      {src && isError && (
        <div className={styles['error']}>
          <span className={cn(styles['icon'], 'fas fa-exclamation-circle')} />
        </div>
      )}
      { ! src && (
        <div className={styles['empty']}>
          <span className={cn(styles['icon'], 'far fa-image')} />
        </div>
      )}
    </div>
  );
}

Image.propTypes = {
  className: types.string,
  src: types.string,
  size: types.oneOf([COVER_SIZE, null]),
  isResize: types.bool,
};

Image.defaultProps = {
  className: '',
  src: null,
  size: 'cover',
  isResize: false,
};
